import React, { useEffect } from 'react';
import { getPageTitle } from '../../util/routes';
import Icon from '../../components/Icon';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { getLightGroupsByType, isLightsLoading } from '../../selectors/lightsSelectors';
import { actionFetchLightGroups, actionUpdateLightGroup } from '../../actions/lightActions';
import styles from './LightOverViewPage.module.css';
import { withAuth } from '../../hocs/withAuth';
import Page from '../../components/Page';
import Switch from '../../components/Switch';
import Spinner from '../../components/Spinner';
import Slider from '../../components/Slider';
import Typography from '../../components/Typography';
import { useComponentDidMount } from '../../hocs/useComponentDidMount';

const GroupClassIconMapping: Record<string, string> = {
  Kitchen: 'kitchen',
  'Living room': 'weekend',
  Bedroom: 'local_hotel',
  Dining: 'local_dining',
  Downstairs: 'home',
};

const MAX_BRIGHTNESS = 254;

function LightOverviewPage() {
  const isLoading = useSelector(isLightsLoading);
  const lightGroupsByType = useSelector(getLightGroupsByType);
  const dispatch = useDispatch();

  useComponentDidMount(() => {
    dispatch(actionFetchLightGroups());
  });

  const getTypeName = (type: string): string => {
    switch (type) {
      case 'Zone':
        return 'Zonen';
      default:
        return 'Zimmer';
    }
  };

  const setBrightness = (value: number): void => {
    console.log(value);
  };

  return (
    <Page pageTitle="Licht" className={styles.LightOverviewPage}>
      {isLoading && Object.keys(lightGroupsByType).length === 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner color="primary" />
        </div>
      ) : (
        Object.values(lightGroupsByType).map((typeGroup) => (
          <React.Fragment key={typeGroup.type}>
            <Typography variant="h6">{getTypeName(typeGroup.type)}</Typography>
            <div className="LightGroups">
              {typeGroup.groups.map((group) => {
                const { _data: data } = group;
                const isOn = data.state.all_on || data.state.any_on;
                return (
                  <div className={classNames(styles.LightGroup, { [styles.Enabled]: isOn })} key={data.id}>
                    <div>
                      <Icon icon={GroupClassIconMapping[data.class] ?? 'emoji_objects_outlined'} />
                      <Typography variant="body1">{group._data.name}</Typography>
                      <Switch
                        color="primary"
                        className={styles.Switch}
                        checked={isOn}
                        onChange={() => dispatch(actionUpdateLightGroup(data.id, !isOn))}
                      />
                    </div>
                    {false && (
                      <Slider
                        value={data.action?.bri ?? 0}
                        // @ts-ignore
                        onChange={(e, value) => setBrightness(value as number)}
                        max={MAX_BRIGHTNESS}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ))
      )}
    </Page>
  );
}

export default withAuth(LightOverviewPage);
