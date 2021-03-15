import React from 'react';
import { Collapse, Divider, Drawer } from '@material-ui/core';
import IconButton from '../IconButton';
import List from '../List';
import routes from '../../util/routes';

import MenuItem from './MenuItem';
import Icon from '../Icon';

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

const MainMenu: React.FC<Props> = ({ open, onClose }: Props) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const isOpenItem = (text: string): boolean => openItem === text;

  return (
    <Drawer variant="temporary" anchor="left" open={open} onClose={() => onClose()} BackdropProps={{invisible: true}}>
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
              <MenuItem menuItem={item} isOpen={isOpen} onSelect={onClose} onToggle={setOpenItem} />
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
