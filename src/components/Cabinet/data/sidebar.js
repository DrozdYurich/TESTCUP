export function getMenuItems({
  goToPD,
  gotoProfil,
  gotoPunct,
  removetoken,
  goToWins,
  gotoProfilTwo,
  gotoProfilThree,
  isAdmin = false,
}) {
  const menuItems = [
    {
      separator: true,
    },
    {
      label: "Личная информация",
      items: [
        {
          label: "Мои данные",
          icon: "pi pi-user",
          shortcut: "⌘+N",
          command: goToPD,
          key: "pd",
        },
        {
          label: "История участия",
          icon: "pi pi-history",
          shortcut: "⌘+S",
          command: gotoPunct,
          key: "data",
        },
        {
          label: "Статистика участия",
          icon: "pi pi-chart-line",
          shortcut: "⌘+S",
          command: gotoProfilTwo,
          key: "data",
        },
      ],
    },
    {
      label: "Личный счёт",
      items: [
        {
          label: "Кошелёк",
          icon: "pi pi-credit-card",
          shortcut: "⌘+O",
          command: gotoProfil,
          key: "profile1",
        },
      ],
    },
    {
      label: "Достижения",
      items: [
        {
          label: "Мои награды",
          icon: "pi pi-trophy",
          shortcut: "⌘+O",
          command: goToWins,
          key: "profile1",
        },
      ],
    },
    {
      label: "Администрирование",
      items: [
        ...(isAdmin
          ? [
              {
                label: "Панель администрирования",
                icon: "pi pi-cog",
                shortcut: "⌘+A",
                command: gotoProfilThree,
                key: "admin",
              },
            ]
          : []),
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

  return menuItems;
}
