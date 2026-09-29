import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Dropdown from "../../ui/DropDown";
import Button from "../../ui/Button";

import { useAddGuest } from "./useAddGuest";
import { countries } from "../../utils/countriesData";

// Email regex: /\S+@\S+\.\S+/

function AddGuestForm() {
  const { register, formState, handleSubmit, setValue } = useForm();
  // manually regester those in form data, because regester object doesn't work on th DropDown
  register("nationality", { required: "Nationality is required" });
  register("countryFlag");

  const { errors } = formState;
  const { addGuest, isAdding } = useAddGuest();

  function onSubmit(data) {
    addGuest(data);
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={false}
          type="text"
          id="fullName"
          {...register("fullName", { required: "this field is required." })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.emailAddress?.message}>
        <Input
          disabled={false}
          id="emailAddress"
          {...register("emailAddress", {
            required: "this field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow label="nationalId" error={errors?.natinalID?.message}>
        <Input
          disabled={false}
          id="natinalID"
          {...register("natinalID", { required: "this field is required." })}
        />
      </FormRow>
      <FormRow label="nationality" error={errors?.nationality?.message}>
        <Dropdown
          disabled={false}
          id="nationality"
          items={countries}
          type="nationality"
          showImage={false}
          fontSize="1.6rem"
          menuHeight="30rem"
          onSelect={(country) => {
            setValue("nationality", country.name, {
              shouldValidate: true,
              shouldDirty: true,
            });
            setValue("countryFlag", country.flag);
          }}
        />
      </FormRow>
      <FormRow>
        {/* type is an html property */}
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isAdding}>Create new guest</Button>
      </FormRow>
    </Form>
  );
}

export default AddGuestForm;
