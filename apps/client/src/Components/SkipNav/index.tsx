import React, { FC, Dispatch, SetStateAction } from 'react';

import useMobile from 'Hooks/useMobile';
import Web from 'Components/SkipNav/Web';

type TSkipNavProps = {
  setIsContrasted?: Dispatch<SetStateAction<boolean>>;
};

export const SkipNav: FC<TSkipNavProps> = (props) => {
  if (!useMobile())
    return <Web updateParentContrasted={props.setIsContrasted} />;
  else return <></>;
};

export default SkipNav;
