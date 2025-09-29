
export const modalSteps = [
  {
    title: "Welcome",
    content: (
      <>
        <p>Thank you for using our app! In this tour, I'll show you key parts of the interface.</p>
      </>
    )
  },
  {
    title: "Menu",
    content: "This is where the main navigation is located: projects, tasks and settings.",
    selector: "#menuBtn"
  },
  {
    title: "Notifications",
    content: "Here you will see important events and updates.",
    selector: "#notifBtn"
  },
  {
    title: "Profile",
    content: "In your profile you can change settings and log out.",
    selector: "#profileBtn"
  }
];
