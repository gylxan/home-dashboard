import React, { HTMLProps, useEffect } from 'react';
import { getPageTitle } from '../../util/routes';

export interface Props extends HTMLProps<HTMLDivElement> {
  pageTitle?: string;
}

const Page: React.FC<Props> = ({ pageTitle, ...props }) => {
  useEffect(() => {
    document.title = getPageTitle(pageTitle);
  }, [pageTitle]);

  return <div {...props} />;
};

export default Page;
