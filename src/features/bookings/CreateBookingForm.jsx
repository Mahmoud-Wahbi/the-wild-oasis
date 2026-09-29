import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { differenceInCalendarDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import Dropdown from "../../ui/DropDown";
import CheckboxWrapper from "../../ui/CheckBoxWrapper";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DatePickerWrapper from "../../ui/DatePickerWrapper";

import { useAddGuest } from "../guests/useAddGuest";
import { useAddBooking } from "./useCreateBooking";
import { useUpdateBooking } from "./useUpdateBooking";
import Row from "../../ui/Row";
import { useGuestsForBooking } from "../guests/useGuestsForBooking";
import { useAvailableCabins } from "../cabins/useAvailableCabins";
import { useSettings } from "../settings/useSettings";
import SpinnerMini from "../../ui/SpinnerMini";
import { countries } from "../../utils/countriesData";

function CreateBookingForm({ bookingToEdit = null }) {
  const [guestMode, setGuestMode] = useState("existing");
  const [formVersion, setFormVersion] = useState(0);
  const isEditSession = Boolean(bookingToEdit);
  const navigate = useNavigate();

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // manually regester those in form data, because regester object doesn't work on non input components
  register("guestId", {
    validate: (value) =>
      guestMode === "new" || value ? true : "Guest is required",
  });
  register("nationality", {
    validate: (value) =>
      guestMode === "existing" || value ? true : "Nationality is required",
  });
  register("countryFlag");
  register("cabinId", { required: "Cabin is required" });
  register("status", { required: "Status is required" });

  const startDate = watch("startDate");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");
  const endDate = watch("endDate");
  const cabinId = watch("cabinId");
  const numGuests = watch("numGuests");

  const {
    data: guests,
    isLoading: isLoadingGuests,
    error: guestsError,
  } = useGuestsForBooking();
  const { addGuestAsync, isAdding: isAddingGuest } = useAddGuest();
  const { addBookingAsync, isAdding: isAddingBooking } = useAddBooking();
  const { updateBookingAsync, isUpdating } = useUpdateBooking();
  const {
    cabins,
    isLoading: isLoadingCabins,
    error: cabinsError,
  } = useAvailableCabins(startDate, endDate, bookingToEdit?.id);
  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useSettings();

  const selectedCabin = cabins.find((cabin) => cabin.id === cabinId);
  const numNights =
    startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;
  const cabinPrice = selectedCabin
    ? numNights * (selectedCabin.regularPrice - selectedCabin.discount)
    : 0;
  const extrasPrice = hasBreakfast
    ? numNights * (settings?.breakfastPrice ?? 0) * Number(numGuests || 0)
    : 0;
  const totalPrice = cabinPrice + extrasPrice;
  const isSubmitting = isAddingGuest || isAddingBooking || isUpdating;
  const hasSelectedDates =
    startDate instanceof Date &&
    Number.isFinite(startDate.getTime()) &&
    endDate instanceof Date &&
    Number.isFinite(endDate.getTime()) &&
    endDate > startDate;

  useEffect(() => {
    setValue("numNights", numNights, { shouldValidate: true });
  }, [numNights, setValue]);

  useEffect(() => {
    if (cabinId && !selectedCabin) {
      setValue("cabinId", undefined, { shouldValidate: true });
    }
  }, [cabinId, selectedCabin, setValue]);

  useEffect(() => {
    if (!bookingToEdit) return;

    reset({
      guestId: bookingToEdit.guests?.id,
      nationality: bookingToEdit.guests?.nationality,
      countryFlag: bookingToEdit.guests?.countryFlag,
      fullName: bookingToEdit.guests?.fullName,
      emailAddress: bookingToEdit.guests?.emailAddress,
      natinalID: bookingToEdit.guests?.natinalID,
      startDate: new Date(bookingToEdit.startDate),
      endDate: new Date(bookingToEdit.endDate),
      cabinId: bookingToEdit.cabinId,
      numGuests: bookingToEdit.numGuests,
      numNights: bookingToEdit.numNights,
      hasBreakfast: bookingToEdit.hasBreakfast,
      status: bookingToEdit.status,
      isPaid: bookingToEdit.isPaid,
      observations: bookingToEdit.observations,
    });
  }, [bookingToEdit, reset]);

  const statuses = [
    { name: "unconfirmed" },
    { name: "checked-in" },
    { name: "checked-out" },
  ];

  /*
   * Convert guests to the shape expected by our Dropdown.
   *  guests have fullName,
   * while the Dropdown already works with name.
   */
  const guestItems =
    guests?.map((guest) => ({
      ...guest,
      name: guest.fullName,
    })) ?? [];

  async function onSubmit(data) {
    try {
      let guestId = data.guestId;

      /*
       * If the user is creating a new guest,
       * create the guest only now.
       *
       * Nothing is inserted while the user is
       * simply filling the form.
       */
      if (guestMode === "new") {
        const newGuest = await addGuestAsync({
          fullName: data.fullName,
          emailAddress: data.emailAddress,
          natinalID: data.natinalID,
          nationality: data.nationality,
          countryFlag: data.countryFlag,
        });

        guestId = newGuest.id;
      }

      const booking = {
        guestId,
        cabinId: data.cabinId,
        startDate: format(data.startDate, "yyyy-MM-dd"),
        endDate: format(data.endDate, "yyyy-MM-dd"),
        numGuests: Number(data.numGuests),
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        hasBreakfast: data.hasBreakfast ?? false,
        status: data.status,
        isPaid: data.isPaid ?? false,
        observations: data.observations,
      };

      if (isEditSession) {
        await updateBookingAsync({ id: bookingToEdit.id, booking });
        navigate(`/booking/${bookingToEdit.id}`);
      } else {
        await addBookingAsync(booking);
      }

      reset();
      setGuestMode("existing");
      setFormVersion((version) => version + 1);

      console.log("Booking created successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* ========================= */}
      {/* 01 - GUEST                */}
      {/* ========================= */}

      <FormRow label="Guest">
        <div>
          <Row type="horizontal">
            <Button
              type="button"
              variation={guestMode === "existing" ? "primary" : "secondary"}
              onClick={() => setGuestMode("existing")}
            >
              Select existing guest
            </Button>

            <Button
              type="button"
              variation={guestMode === "new" ? "primary" : "secondary"}
              onClick={() => setGuestMode("new")}
            >
              Create new guest
            </Button>
          </Row>
        </div>
      </FormRow>

      {guestMode === "existing" && (
        <FormRow label="Existing guest" error={errors?.guestId?.message}>
          {isLoadingGuests ? (
            <p>Loading guests...</p>
          ) : guestsError ? (
            <p>{guestsError.message}</p>
          ) : (
            <Dropdown
              id="guests"
              items={guestItems}
              type="guest"
              showImage={false}
              key={`guest-${formVersion}`}
              initialSelectedItem={guestItems.find(
                (guest) => guest.id === bookingToEdit?.guests?.id,
              )}
              disabled={isSubmitting}
              onSelect={(guest) => {
                setValue("guestId", guest.id, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          )}
        </FormRow>
      )}

      {guestMode === "new" && (
        <>
          <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              disabled={isAddingGuest || isAddingBooking}
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
          </FormRow>

          <FormRow label="Email" error={errors?.emailAddress?.message}>
            <Input
              type="email"
              id="emailAddress"
              disabled={isAddingGuest || isAddingBooking}
              {...register("emailAddress", {
                required: "Email is required",
              })}
            />
          </FormRow>

          <FormRow label="National ID" error={errors?.natinalID?.message}>
            <Input
              type="text"
              id="natinalID"
              disabled={isAddingGuest || isAddingBooking}
              {...register("natinalID", {
                required: "National ID is required",
              })}
            />
          </FormRow>

          <FormRow label="Nationality" error={errors?.nationality?.message}>
            <Dropdown
              id="nationality"
              items={countries}
              type="nationality"
              showImage={true}
              key={`nationality-${formVersion}`}
              initialSelectedItem={countries.find(
                (country) =>
                  country.name === bookingToEdit?.guests?.nationality,
              )}
              disabled={isSubmitting}
              onSelect={(country) => {
                setValue("nationality", country.name, {
                  shouldValidate: true,
                  shouldDirty: true,
                });

                setValue("countryFlag", country.flag, {
                  shouldDirty: true,
                });
              }}
            />
          </FormRow>
        </>
      )}

      {/* ========================= */}
      {/* 02 - BOOKING              */}
      {/* ========================= */}

      <FormRow label="Start date" error={errors?.startDate?.message}>
        <DatePickerWrapper>
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: "Start date is required",
            }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setValue("endDate", undefined);
                  setValue("cabinId", undefined, { shouldValidate: true });
                }}
                disabled={isSubmitting}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select start date"
                minDate={new Date()}
              />
            )}
          />
        </DatePickerWrapper>
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <DatePickerWrapper>
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: "End date is required",
              validate: (date) => {
                if (!date || !settings) return true;

                const nights = differenceInCalendarDays(date, startDate);
                if (nights < settings.minBookingLength)
                  return `Minimum stay is ${settings.minBookingLength} nights`;
                if (nights > settings.maxBookingLength)
                  return `Maximum stay is ${settings.maxBookingLength} nights`;

                return true;
              },
            }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setValue("cabinId", undefined, { shouldValidate: true });
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select end date"
                disabled={!startDate || isSubmitting}
                minDate={startDate}
              />
            )}
          />
        </DatePickerWrapper>
      </FormRow>

      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        {!hasSelectedDates ? (
          <p>Select start and end dates first.</p>
        ) : isLoadingCabins ? (
          <SpinnerMini />
        ) : cabinsError ? (
          <p>{cabinsError.message}</p>
        ) : (
          <Dropdown
            key={`cabin-${formVersion}-${startDate?.getTime() || ""}-${endDate?.getTime() || ""}`}
            id="cabin"
            items={cabins}
            type="cabin"
            initialSelectedItem={selectedCabin}
            disabled={isSubmitting || !endDate}
            onSelect={(cabin) => {
              setValue("cabinId", cabin.id, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        )}
      </FormRow>

      <FormRow label="Guests count" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          min={1}
          max={selectedCabin?.maxCapacity ?? settings?.maxGuestsPerBooking}
          disabled={isSubmitting}
          {...register("numGuests", {
            required: "Guests count is required",
            min: { value: 1, message: "At least one guest is required" },
            max: {
              value:
                selectedCabin?.maxCapacity ?? settings?.maxGuestsPerBooking,
              message: selectedCabin
                ? `This cabin accommodates up to ${selectedCabin.maxCapacity} guests`
                : `Maximum ${settings?.maxGuestsPerBooking || "allowed"} guests`,
            },
          })}
        />
      </FormRow>

      <input type="hidden" {...register("numNights")} />

      <FormRow label="Nights">
        <Input
          type="number"
          id="numNights"
          value={numNights || ""}
          disabled
          readOnly
        />
      </FormRow>

      <FormRow label="Cabin price">
        <Input
          type="number"
          id="cabinPrice"
          value={cabinPrice || ""}
          disabled
          readOnly
        />
      </FormRow>

      <FormRow label="Breakfast">
        <CheckboxWrapper>
          <Input
            type="checkbox"
            id="hasBreakfast"
            disabled={isSubmitting}
            {...register("hasBreakfast")}
          />

          <label htmlFor="hasBreakfast">
            {hasBreakfast ? "Breakfast Included" : "Breakfast"}
          </label>
        </CheckboxWrapper>
      </FormRow>

      <FormRow label="Extras price">
        <Input
          type="number"
          id="extrasPrice"
          value={extrasPrice || ""}
          disabled
          readOnly
        />
      </FormRow>

      <FormRow label="Total price">
        <Input
          type="number"
          id="totalPrice"
          value={totalPrice || ""}
          disabled
          readOnly
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <Dropdown
          id="status"
          items={statuses}
          type="status"
          showImage={false}
          menuHeight="15rem"
          key={`status-${formVersion}`}
          initialSelectedItem={statuses.find(
            (status) => status.name === bookingToEdit?.status,
          )}
          disabled={isSubmitting}
          onSelect={(status) => {
            setValue("status", status.name, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
      </FormRow>

      <FormRow label="Is paid">
        <CheckboxWrapper>
          <Input
            type="checkbox"
            id="isPaid"
            disabled={isSubmitting}
            {...register("isPaid")}
          />

          <label htmlFor="isPaid">
            {isPaid
              ? "Booking fees paid"
              : "The booking fees have not been paid"}
          </label>
        </CheckboxWrapper>
      </FormRow>

      <FormRow label="Observations">
        <Textarea
          id="observations"
          disabled={isSubmitting}
          {...register("observations")}
        />
      </FormRow>

      {/* ========================= */}
      {/* ACTIONS                   */}
      {/* ========================= */}

      <FormRow>
        {settingsError && <p>{settingsError.message}</p>}

        <Button
          type="reset"
          variation="secondary"
          onClick={
            isEditSession
              ? () => navigate(`/booking/${bookingToEdit.id}`)
              : undefined
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            isLoadingSettings ||
            !!settingsError ||
            isLoadingCabins ||
            !selectedCabin
          }
        >
          {isEditSession ? "Update booking" : "Create booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
