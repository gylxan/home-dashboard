import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { getLightGroups, updateLightGroup } from '../../util/apiclient';
import { getPageTitle } from '../../util/routes';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../../components/Icon';
import classNames from 'classnames';

import styles from './LightOverViewPage.module.css';

const GroupClassIconMapping: Record<string, IconProp> = {
  Kitchen: 'coffee',
  'Living room': 'couch',
  Bedroom: 'bed',
  Dining: 'utensils',
  Downstairs: 'home',
};

const MAX_BRIGHTNESS = 254;

function LightOverviewPage() {
  const [isLoading, setLoading] = useState(true);
  const [lightGroups, setLightGroups] = useState([] as any[]);

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    setLoading(true);
    loadLightGroups();
  }, []);

  const loadLightGroups = (): Promise<void> => {
    return getLightGroups()
      .then((data) => setLightGroups(data))
      .finally(() => setLoading(false));
  };

  const lightGroupsByType: Record<string, { type: string; groups: any[] }> = lightGroups.reduce((accu, current) => {
    if (current._data.type === 'LightGroup') {
      return accu;
    }
    if (!accu[current._data.type]) {
      accu[current._data.type] = {
        type: current._data.type,
        groups: [],
      };
    }
    accu[current._data.type].groups.push(current);
    return accu;
  }, {});

  const getTypeName = (type: string): string => {
    switch (type) {
      case 'Zone':
        return 'Zonen';
      default:
        return 'Zimmer';
    }
  };

  const setBrightness = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value);
  };

  const toggleGroupState = async (id: string, on: boolean): Promise<void> => {
    const groupData = await updateLightGroup(id, on);
    setLightGroups(groupData);
  };

  return (
    <div className={styles.LightOverviewPage}>
      {isLoading && lightGroups.length !== 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner variant="secondary" as="span" animation="border" role="status" aria-hidden="true" />
        </div>
      ) : (
        Object.values(lightGroupsByType).map((typeGroup) => (
          <>
            <h6>{getTypeName(typeGroup.type)}</h6>
            <div className="LightGroups">
              {typeGroup.groups.map((group) => {
                const { _data: data } = group;
                const isOn = data.state.all_on === true || data.state.any_one === true;
                return (
                  <div className={classNames(styles.LightGroup, { [styles.Enabled]: isOn })} key={data.id}>
                    <div>
                      <Icon icon={GroupClassIconMapping[data.class] ?? ['far', 'lightbulb']} />
                      {group._data.name}
                      <Form.Switch
                        id={`light-group-${data.id}-switch`}
                        className={styles.Switch}
                        checked={isOn}
                        onChange={() => toggleGroupState(data.id, !isOn)}
                      />
                    </div>
                    {false && (
                      <Form.Control
                        type="range"
                        className={styles.BrightnessRange}
                        value={data.action?.bri ?? 0}
                        max={MAX_BRIGHTNESS}
                        onChange={setBrightness}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ))
      )}
    </div>
  );
}

export default LightOverviewPage;
