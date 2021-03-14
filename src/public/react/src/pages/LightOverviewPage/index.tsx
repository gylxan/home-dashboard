import React, { useEffect } from 'react';
import { getPageTitle } from '../../util/routes';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../../components/Icon';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { getLightGroupsByType, isLightsLoading } from '../../selectors/lightsSelectors';
import { actionFetchLightGroups, actionUpdateLightGroup } from '../../actions/lightActions';
import styles from './LightOverViewPage.module.css';
import {withAuth} from "../../hocs/withAuth";
import Page from "../../components/Page";
import Switch from "../../components/Switch";
import Spinner from "../../components/Spinner";

const GroupClassIconMapping: Record<string, IconProp> = {
  Kitchen: 'coffee',
  'Living room': 'couch',
  Bedroom: 'bed',
  Dining: 'utensils',
  Downstairs: 'home',
};

const MAX_BRIGHTNESS = 254;

function LightOverviewPage() {
  const isLoading = useSelector(isLightsLoading);
  const lightGroupsByType = useSelector(getLightGroupsByType);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = getPageTitle('Skip-Bo');
    dispatch(actionFetchLightGroups());
  }, [dispatch]);

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

  return (
    <Page pageTitle="Licht" className={styles.LightOverviewPage}>
      {isLoading && Object.keys(lightGroupsByType).length === 0 ? (
        <div className={styles.LoadingSpinner}>
          <Spinner color="primary"/>
        </div>
      ) : (
        Object.values(lightGroupsByType).map((typeGroup) => (
          <>
            <h6>{getTypeName(typeGroup.type)}</h6>
            <div className="LightGroups">
              {typeGroup.groups.map((group) => {
                const { _data: data } = group;
                const isOn = data.state.all_on || data.state.any_on;
                return (
                  <div className={classNames(styles.LightGroup, { [styles.Enabled]: isOn })} key={data.id}>
                    <div>
                      <Icon icon={GroupClassIconMapping[data.class] ?? ['far', 'lightbulb']} />
                      {group._data.name}
                      <Switch
                        color="primary"
                        className={styles.Switch}
                        checked={isOn}
                        onChange={() => dispatch(actionUpdateLightGroup(data.id, !isOn))}
                      />
                    </div>
                    {/*{false && (*/}
                    {/*  <Form.Control*/}
                    {/*    type="range"*/}
                    {/*    className={styles.BrightnessRange}*/}
                    {/*    value={data.action?.bri ?? 0}*/}
                    {/*    max={MAX_BRIGHTNESS}*/}
                    {/*    onChange={setBrightness}*/}
                    {/*  />*/}
                    {/*)}*/}
                  </div>
                );
              })}
            </div>
          </>
        ))
      )}
    </Page>
  );
}

export default withAuth(LightOverviewPage);
