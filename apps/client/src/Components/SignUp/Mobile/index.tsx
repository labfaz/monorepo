import React, { FC, useRef, useState } from 'react';
import { Formik, FormikConfig, FormikValues, Form } from 'formik';

import {
  FaYoutubeSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
  FaLinkedin,
  FaInstagramSquare,
} from 'react-icons/fa';

import { SignUp } from 'Api/SignUp';

import { Step01, schemaStep01 } from './Step01';
import { Step02, schemaStep02 } from './Step02';
import { Step03, schemaStep03 } from './Step03';
import { Step04, schemaStep04 } from './Step04';
import { Step05, schemaStep05 } from './Step05';
import { Step06, schemaStep06 } from './Step06';
import { Step07, schemaStep07 } from './Step07';
// import { Step08, schemaStep08 } from './Step08';
import { Step09, schemaStep09 } from './Step09';
// import { Step10, schemaStep10 } from './Step10';
import { Step11, schemaStep11 } from './Step11';
// import { Step12, schemaStep12 } from './Step12';
import { Step13, schemaStep13 } from './Step13';
import { Step14, schemaStep14 } from './Step14';
import { Step15, schemaStep15 } from './Step15';
import { Step16, schemaStep16 } from './Step16';
import { Step17, schemaStep17 } from './Step17';
import { Step18, schemaStep18 } from './Step18';

import {
  FormTitle,
  FormContainer,
  FormButton,
  SessionContainer,
  ButtonContainer,
  FormHeader,
  RightSession,
  ConfirmEmailModal,
  ErrorModalContainer,
} from './index.style';

import { useSocialNetworksLabfaz } from 'Api/SocialNetworksLabfaz';
import { useHistory } from 'react-router';
import { ErrorObject } from 'Api';

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
}

export const Mobile: FC<ButtonProps> = ({ buttonType }) => {
  return (
    <>
      <FormHeader />
      <FormikStepper
        initialValues={{
          email: '',
          password: '',
          confirm_password: '',
          other_idiom: '',
          use_terms: '',
          profilePicture: null,
          curriculum: null,
          Other_TechnicalArea: '',
          artist: {
            name: '',
            social_name: '',
            artistic_name: '',
            show_name: '',
            gender: '',
            sexual_orientation: '',
            gender_specific: '',
            other_gender: '',
            cpf: '',
            birthday: '',
            rg: '',
            expedition_department: '',
            is_trans: '',
            race: '',
            accessibility_resources_description: null,
            address: {
              city: '',
              cep: '',
              neighbourhood: '',
              number: '',
              complement: '',
              residency: 'df',
              state: 'Distrito Federal',
            },
            contact: {
              whatsapp: '',
              twitter: '',
              facebook: '',
              instagram: '',
              linkedin: '',
              tiktok: '',
              youtube: '',
            },
            technical: {
              formation: '',
              is_drt: '',
              is_ceac: '',
              is_cnpj: '',
              drt: '',
              ceac: '',
              cnpj: '',
              // name_enterprise: '',
              cnpj_type: 'Nenhum',
              profession: '',
              areas: {
                technical_formation: 'autodidata',
                name: 'Outro',
                describe: '',
                started_year: '2021',
                certificate: [],
              },
              idiom: [],
            },
          },
          buttonType,
        }}
        onSubmit={() => {}}
      >
        <FormikStep validationSchema={schemaStep01}>
          <Step01 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep02}>
          <Step02 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep03}>
          <Step03 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep04}>
          <Step04 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep05}>
          <Step05 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep06}>
          <Step06 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep07}>
          <Step07 />
        </FormikStep>
        {/* <FormikStep validationSchema={schemaStep08}>
          <Step08 />
        </FormikStep> */}
        <FormikStep validationSchema={schemaStep09}>
          <Step09 />
        </FormikStep>
        {/* <FormikStep validationSchema={schemaStep10}>
          <Step10 />
        </FormikStep> */}
        <FormikStep validationSchema={schemaStep11}>
          <Step11 />
        </FormikStep>
        {/* <FormikStep validationSchema={schemaStep12}>
          <Step12 />
        </FormikStep> */}
        <FormikStep validationSchema={schemaStep13}>
          <Step13 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep14}>
          <Step14 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep15}>
          <Step15 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep16}>
          <Step16 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep17}>
          <Step17 />
        </FormikStep>
        <FormikStep validationSchema={schemaStep18}>
          <Step18 />
        </FormikStep>
      </FormikStepper>
    </>
  );
};

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues & ButtonProps>) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];

  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const history = useHistory();
  const [error, setError] = useState<ErrorObject | undefined>(undefined);
  const [errorModal, setErrorModal] = useState(false);
  const [confirmEmailModal, setConfirmEmailModal] = useState(false);
  const { data: socialNetworks } = useSocialNetworksLabfaz();

  const modalRef = useRef<HTMLInputElement | null>(null);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const handleRedirect = () => {
    history.push('/login');
  };

  const handleScroll = () => {
    window.scrollTo(0, 150);
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values: any) => {
        if (isLastStep()) {
          if (values.other_idiom) {
            const index = values.artist.technical.idiom.indexOf('Outro');
            values.artist.technical.idiom.splice(index, 1);
            values.artist.technical.idiom.push(values.other_idiom);
            delete values.other_idiom;
          }

          if (values.other_deficiency) {
            const index = values.deficiencies.indexOf('Outro');
            values.deficiencies.splice(index, 1);
            values.deficiencies.push(values.other_deficiency);
            delete values.other_deficiency;
          }

          if (values.artist.other_gender) {
            values.artist.gender = values.artist.other_gender;
            delete values.artist.other_gender;
          }

          if (values.Other_TechnicalArea) {
            values.artist.technical.areas.name = values.Other_TechnicalArea;
            delete values.Other_TechnicalArea;
          }

          delete values.artist.other_gender;
          delete values.use_terms;

          SignUp(values)
            .then(() => {
              setConfirmEmailModal(true);
            })
            .catch((err) => [setError(err.message), setErrorModal(true)]);
        } else {
          setStep((currentStep) => currentStep + 1);
        }
      }}
    >
      <Form>
        <FormTitle level={1} children="Cadastre-se" />
        <SessionContainer>
          <FormContainer currentStep={step}>
            <div className="form">
              <ConfirmEmailModal ref={modalRef} isOpen={confirmEmailModal}>
                <div className="confirmEmailContainer">
                  <h1>Confirme seu email para verificar a conta</h1>
                  <div className="socialMedias">
                    {socialNetworks?.youtube && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href={socialNetworks?.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutubeSquare />
                      </a>
                    )}
                    {socialNetworks?.facebook && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href={socialNetworks?.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookSquare />
                      </a>
                    )}
                    {socialNetworks?.twitter && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href={socialNetworks?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitterSquare />
                      </a>
                    )}
                    {socialNetworks?.googlePlus && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href={socialNetworks?.googlePlus}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGooglePlusSquare />
                      </a>
                    )}
                    {socialNetworks?.linkedin && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href={socialNetworks?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {socialNetworks?.instagram && (
                      // eslint-disable-next-line jsx-a11y/anchor-is-valid
                      <a
                        href={socialNetworks?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagramSquare />
                      </a>
                    )}
                  </div>

                  <button type="button" onClick={() => handleRedirect()}>
                    VOLTAR
                  </button>
                </div>
              </ConfirmEmailModal>

              <ErrorModalContainer ref={modalRef} isOpen={errorModal}>
                <div className="errorModalContainer">
                  <h1>Ops... algo deu errado</h1>
                  <h2>{error}</h2>

                  <button
                    type="button"
                    onClick={() => [setErrorModal(false), setStep(0)]}
                  >
                    VOLTAR
                  </button>
                </div>
              </ErrorModalContainer>

              {currentChild}

              <ButtonContainer lastStep={isLastStep()}>
                {step > 0 && (
                  <FormButton
                    type="button"
                    onClick={() => setStep((currentStep) => currentStep - 1)}
                  >
                    VOLTAR
                  </FormButton>
                )}
                <FormButton
                  type={
                    isLastStep() ? props.initialValues.buttonType : 'submit'
                  }
                  onClick={() => handleScroll()}
                >
                  {isLastStep() ? 'FINALIZAR' : 'AVANÇAR'}
                </FormButton>
              </ButtonContainer>
            </div>
            <RightSession currentStep={step} lastStep={isLastStep()}>
              <div className="sessionContainer">
                {[...Array(childrenArray.length - 1)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`formSession ${idx < step && 'checked'}`}
                  />
                ))}
              </div>
            </RightSession>
          </FormContainer>
        </SessionContainer>
      </Form>
    </Formik>
  );
}
