export function getMenuItems({ goToPD, gotoProfil, gotoPunct, removetoken }) {
  return [
    {
      separator: true,
    },
    {
      label: "Общая информация",
      items: [
        {
          label: "Мои данные",
          icon: "pi pi-plus",
          shortcut: "⌘+N",
          command: goToPD,
          key: "pd",
        },
        {
          label: "Еще пункт",
          icon: "pi pi-search",
          shortcut: "⌘+S",
          command: gotoPunct,
          key: "data",
        },
      ],
    },
    {
      label: "Профиль",
      items: [
        {
          label: "Пункт профиля",
          icon: "pi pi-cog",
          shortcut: "⌘+O",
          command: gotoProfil,
          key: "profile1",
        },
        {
          label: "Пункт профиля 2",
          icon: "pi pi-inbox",
          badge: 3,
          command: gotoProfil,
          key: "profile2",
        },
        {
          label: "Пункт профиля 2",
          icon: "pi pi-inbox",
          badge: 3,
          command: gotoProfil,
          key: "profile2",
        },
        {
          label: "Выход",
          icon: "pi pi-sign-out",
          shortcut: "⌘+Q",
          command: removetoken,
          key: "logout",
        },
      ],
    },
    {
      separator: true,
    },
  ];
}
