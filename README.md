# 🏨 The Wild Oasis

A hotel management dashboard built with React that enables hotel staff to manage bookings, cabins, guests, check-ins, check-outs, and hotel settings through a centralized interface. It also provides operational statistics and interactive charts to help monitor hotel performance.

## 🌐 Live Demo

https://the-wild-oasis-mahmoud-wahbi.netlify.app/login

## 📸 Project Preview

<img width="1365" height="631" alt="Image" src="https://github.com/user-attachments/assets/ff6fbc98-9284-4302-bbb7-49c0d002adfd" />

----
<img width="1348" height="629" alt="Image" src="https://github.com/user-attachments/assets/6a2f649c-c44b-488a-9ffe-a82beb34d28e" />

----
<img width="1347" height="631" alt="Image" src="https://github.com/user-attachments/assets/fa7535fd-050a-469a-805c-099d0d27f7d1" />

----
<img width="1350" height="630" alt="Image" src="https://github.com/user-attachments/assets/a32f2955-ee30-4928-9dec-7764643177a9" />

----
<img width="1351" height="633" alt="Image" src="https://github.com/user-attachments/assets/75344dc9-0175-48d8-9039-f3c417b63100" />

----
<img width="1346" height="629" alt="Image" src="https://github.com/user-attachments/assets/2dc865b5-67db-48cc-8394-beffa98c5066" />

----
<img width="1365" height="626" alt="Image" src="https://github.com/user-attachments/assets/52b0cc48-86b7-498b-87c6-6b1be9fcf60f" />

----
<img width="1364" height="634" alt="Image" src="https://github.com/user-attachments/assets/67fe39d5-74ec-47d2-baac-fcc95c660867" />

----
<img width="1346" height="630" alt="Image" src="https://github.com/user-attachments/assets/21b4a525-42dc-4f59-ad0f-ab360b82b5f9" />

----
<img width="1364" height="628" alt="Image" src="https://github.com/user-attachments/assets/995ab52c-d18b-42e5-8fe5-f8a18550a1fb" />

-----
<img width="1351" height="628" alt="Image" src="https://github.com/user-attachments/assets/1e44181d-99ff-4ad3-ab73-878f7ad9f594" />


## ✨ Features

- **Authentication & Protected Routes:** Sign up, log in, log out, and access protected application pages.
- **Booking Management:** Create, edit, delete, and view bookings, with guest selection, cabin availability checks, date validation, and automatic price calculations.
- **Check-in & Check-out:** Manage guest arrivals and departures, confirm payments, and optionally include breakfast in the booking total.
- **Cabin Management:** Create, edit, delete, search, filter, and sort cabins, including image uploads.
- **Guest Management:** Manage guest records and nationality information.
- **Advanced Table Operations:** Search, filter, sort, and paginate through booking data, with table state reflected in URL search parameters.
- **Dashboard Analytics:** View booking statistics, sales figures, occupancy rates, and stay-duration charts.
- **Hotel Settings:** Configure booking duration limits, maximum guest capacity, and breakfast pricing.
- **Account Management:** Update personal information, passwords, and profile images.
- **Dark Mode:** Switch between light and dark themes with the selected preference persisted in local storage.
- **User Feedback & Error Handling:** Loading indicators, toast notifications, empty states, confirmation dialogs, and error fallbacks.

## 🛠️ Built With

- **React 18** — Functional components, hooks, component composition, and reusable UI.
- **React Router DOM** — Client-side routing, nested routes, dynamic route parameters, protected routes, navigation, and URL search parameters.
- **TanStack React Query** — Asynchronous data fetching, server-state caching, mutations, cache invalidation, loading and error states, and query prefetching.
- **Supabase** — Authentication, database operations, and file storage for cabin images and user avatars.
- **React Hook Form** — Form state management, validation, submission, and resetting.
- **React Datepicker** — Date selection and booking date-range controls.
- **date-fns** — Date formatting, duration calculations, date comparisons, and date-range processing.
- **Recharts** — Interactive sales and stay-duration visualizations.
- **styled-components** — Component-level styling, reusable styled elements, global styles, and theme-aware interfaces.
- **Context API** — Shared dark-mode state and reusable component-level contexts.
- **React Hot Toast** — Success and error notifications.
- **React Error Boundary** — Application-level error fallback and recovery.
- **React Icons** — Consistent icons across navigation, tables, forms, and dashboard components.
- **Vite** — Development server and production build tooling.

## 💡 What I Learned

This project was a major step forward in my React development journey. It helped me move beyond building individual interfaces and gain practical experience structuring a larger application with realistic business workflows and multiple interconnected features.

### Advanced Data Fetching & Server-State Management

I developed a deeper understanding of **TanStack React Query** and its role in managing server state separately from local UI state. I practiced defining query keys and query functions, handling asynchronous loading and error states, performing mutations, invalidating cached queries after data changes, and prefetching data to improve navigation between booking pages.

### Routing & URL State Management

I gained practical experience with **React Router**, including nested routes, dynamic route parameters, protected pages, redirects, and not-found routes. I also learned how to use URL search parameters to represent table search, filtering, sorting, and pagination state, making those views easier to navigate and share.

### Forms, Validation & Date Handling

Using **React Hook Form**, I implemented forms with validation rules, submission handling, and conditional fields. I integrated a date picker with form controls and used **date-fns** for date comparisons, booking-duration calculations, formatting, and business rules involving minimum and maximum stay lengths.

### Backend Integration & Real Business Logic

I learned how to connect a React application to **Supabase** for authentication, database queries, record creation and updates, deletion, and file uploads. I applied these skills to practical hotel workflows, including cabin availability checks, booking price calculations, breakfast extras, payment confirmation, check-in, and checkout.

### Reusable Components & Application Architecture

I gained experience organizing code around individual features, separating backend operations into service modules, and keeping reusable interface components distinct from page-level logic. I also practiced compound-component patterns for building flexible tables, modals, and menus, along with custom hooks for reusable behavior.

### Context API, Persistence & Theming

I used the **Context API** to share dark-mode state across components and built a custom hook to persist state in local storage. I also worked with CSS variables and global styles to support theme switching throughout the interface.

### Data Visualization & User Experience

With **Recharts**, I transformed application data into sales and stay-duration charts. I also improved the overall user experience by implementing loading indicators, success and error notifications, empty states, disabled controls during mutations, confirmation dialogs, and an application-level error boundary.

Overall, this project strengthened my ability to combine React concepts, specialized libraries, backend services, and reusable architecture into a more complete application.
