import React from 'react';

import List from '../List';
import classNames from 'classnames';
import { MenuEntry } from './index';
import { useHistory } from 'react-router-dom';

import styles from './MenuItem.module.css';
import Icon from '../Icon';

export interface Props {
  menuItem: MenuEntry;
  isOpen?: boolean;
  isSubMenuItem?: boolean;
  onToggle?: (itemText: null | string) => void;
  onSelect: () => void;
}

const MenuItem: React.FC<Props> = ({ menuItem, isOpen, isSubMenuItem, onToggle, onSelect }) => {
  const history = useHistory();
  const hasChildItems = !!menuItem.items?.length;
  return (
    <List.Item
      className={classNames({ [styles.SubMenuItem]: !!isSubMenuItem })}
      button
      key={menuItem.text}
      onClick={() => {
        if (hasChildItems) {
          onToggle?.(isOpen ? null : menuItem.text);
        } else if (!!menuItem.route) {
          onSelect();
          history.push(menuItem.route);
        }
      }}
    >
      <List.ItemText primary={menuItem.text} />
      {hasChildItems && (isOpen ? <Icon icon="expand_less" /> : <Icon icon="expand_more" />)}
    </List.Item>
  );
};

export default MenuItem;
