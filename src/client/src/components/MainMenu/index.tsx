import React from 'react';
import { Collapse, Divider, Drawer } from '@material-ui/core';
import IconButton from '../IconButton';
import List from '../List';
import routes from '../../util/routes';

import MenuItem from './MenuItem';
import Icon from '../Icon';
import { useLocation } from 'react-router-dom';

export interface Props {
  open?: boolean;
  onClose: () => void;
}

export interface MenuEntry {
  text: string;
  route?: string;
  items?: MenuEntry[];
}

const menu: MenuEntry[] = [
  {
    text: 'Skip-Bo',
    items: [
      { text: 'Übersicht', route: routes.skipbo },
      { text: 'Tabellenübersicht', route: routes.skipboTable },
    ],
  },
  {
    text: 'Entscheidomat',
    route: routes.entscheidomat,
  },
  {
    text: 'Licht',
    route: routes.light,
  },
];

const getInitialOpenMenuItem = (pathname: string, entries: MenuEntry[]): string | null => {
  if (pathname === '/') {
    return null;
  }
  const entry = entries.find((entry) => {
    let isEntrySelected = entry.route?.startsWith(pathname);
    if (!isEntrySelected && !!entry.items?.length) {
      isEntrySelected = !!getInitialOpenMenuItem(pathname, entry.items);
    }
    return isEntrySelected;
  });
  return entry?.text ?? null;
};

const MainMenu: React.FC<Props> = ({ open, onClose }: Props) => {
  const { pathname } = useLocation();
  const isSelected = (entry: MenuEntry): boolean => entry.route === pathname;
  const [openItem, setOpenItem] = React.useState<string | null>(getInitialOpenMenuItem(pathname, menu));

  const isOpenItem = (text: string): boolean => openItem === text;

  return (
    <Drawer variant="temporary" anchor="left" open={open} onClose={() => onClose()} BackdropProps={{ invisible: true }}>
      <div>
        <IconButton onClick={onClose}>
          <Icon icon="chevron_left" />
        </IconButton>
      </div>
      <Divider />
      <List>
        {menu.map((item) => {
          const isOpen = isOpenItem(item.text);
          return (
            <React.Fragment key={item.text}>
              <MenuItem
                menuItem={item}
                isOpen={isOpen}
                onSelect={onClose}
                onToggle={setOpenItem}
                selected={isSelected(item)}
              />
              {!!item.items?.length && (
                <Collapse in={isOpen} timeout="auto">
                  <List disablePadding>
                    {item.items.map((subItem) => (
                      <MenuItem
                        key={subItem.text}
                        menuItem={subItem}
                        isOpen={isOpenItem(subItem.text)}
                        isSubMenuItem
                        onSelect={onClose}
                        selected={isSelected(subItem)}
                      />
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default MainMenu;
