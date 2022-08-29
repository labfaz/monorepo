import React, { FC } from 'react';
import { useField } from 'formik';
import InputMask from 'react-input-mask';

import { Container, Input } from './style';
import { IoMdInformationCircle } from 'react-icons/io';

export interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  width?: number;
  height?: number;
  inputMask?: string;
  informationText?: string;
  obrigatory?: boolean;
  onChange?: (ev: any) => void;
}

export const TextInput: FC<InputProps> = ({
  label,
  placeholder,
  width,
  inputMask,
  height,
  obrigatory,
  informationText,
  children,
  ...props
}) => {
  const [inputProps, meta] = useField(props);

  return (
    <Container
      {...props}
      validationError={meta.touched && meta.error ? true : false}
    >
      <div className="labelContainer">
        <div className="labelContent">
          <label>
            {label && (
              <>
                {label}

                {obrigatory && <p className="obrigatory"> * </p>}

                {informationText && (
                  <>
                    <div className="svgContainer">
                      <IoMdInformationCircle />
                      <p className="information">{informationText}</p>
                    </div>
                  </>
                )}
              </>
            )}

            <Input>
              {() => (
                <InputMask
                  mask={inputMask ? inputMask : ''}
                  id={props.name}
                  style={{ width: `${width}rem`, height: `${height}rem` }}
                  type="text"
                  placeholder={placeholder}
                  {...inputProps}
                />
              )}
            </Input>
          </label>

          {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
      </div>
    </Container>
  );
};
