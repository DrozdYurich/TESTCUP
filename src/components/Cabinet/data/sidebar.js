export function getMenuItems({
  goToPD,
  gotoProfil,
  gotoPunct,
  removetoken,
  gotoProfilTwo,
  gotoProfilThree,
  isAdmin = true,
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
      label: "Кошелёк",
      items: [
        {
          label: "Карты",
          icon: "pi pi-credit-card",
          shortcut: "⌘+O",
          command: gotoProfil,
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
