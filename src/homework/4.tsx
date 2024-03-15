//# Завдання 4
//Ви вирішили застосувати до меню контекст і тепер вам потрібно його типізувати.
//Описати тип SelectedMenu: Це має бути об'єкт, який містить id з типом MenuIds
//Описати тип MenuSelected: Цей тип є об'єктом, що містить selectedMenu
//Описати тип MenuAction: Цей тип являє собою об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент повертає void.
//Описати тип PropsProvider: Опишіть правильний тип для дітей
//Описати тип PropsMenu: Опишіть тип для menus, він має бути від типу Menu

import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };

// Додати тип Menu Selected
type SelectedMenu = { id: MenuIds }; //Описати тип SelectedMenu
type MenuAction = { onSelectedMenu: (menu: SelectedMenu) => void };

const MenuSelectedContext = createContext<{ selectedMenu: SelectedMenu }>({
  selectedMenu: { id: "first" }, //поч. значення для контексту
});

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children: React.ReactNode; // Додати тип для children
};

function MenuProvider({ children }: PropsProvider) {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({id: "first"});

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Menu[]; // Додайте вірний тип для меню
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );  
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}

// Цей код створює контекст для управління вибором меню:
// SelectedMenu - тип, який представляє об'єкт, що містить ідентифікатор меню з типом MenuIds.
// MenuAction - тип, який представляє об'єкт з методом onSelectedMenu, який приймає об'єкт типу SelectedMenu як аргумент і повертає void.
// PropsProvider - тип, який описує властивості компонента, що забезпечує контекст - має властивість children типу React.ReactNode.
// PropsMenu - тип, який описує властивості компонента меню. Властивість menus має бути масивом об'єктів типу Menu.
// Крім того, створено компоненти MenuProvider та MenuComponent, які використовують контекст, щоб забезпечити стан та дії для меню. 
//Компонент MenuComponent приймає масив об'єктів Menu як вхідні дані та рендерить їх, забезпечуючи можливість вибору меню та відображення обраного меню.