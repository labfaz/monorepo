import React, { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';

import { ErrorObject } from 'Api';
import { SignUp } from 'Api/SignUp';
import { useSocialNetworksLabfaz } from 'Api/SocialNetworksLabfaz';

import { Step01, schemaStep01 } from './Step01';
import { Step02, schemaStep02 } from './Step02';
import { Step03, schemaStep03 } from './Step03';
import { Step04, schemaStep04 } from './Step04';
import { Step05, schemaStep05 } from './Step05';
import { Step06, schemaStep06 } from './Step06';
import { Step07, schemaStep07 } from './Step07';
import { Step08, schemaStep08 } from './Step08';
// import { Step09 } from './Step09';
import { Step10, schemaStep10 } from './Step10';
import { Step11, schemaStep11 } from './Step11';

import {
  FaRegCheckCircle,
  FaYoutubeSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
  FaLinkedin,
  FaInstagramSquare,
} from 'react-icons/fa';

import { Container } from './index.style';

import {
  FormTitle,
  SessionContainer,
  FormContainer,
  NextButton,
  BackButton,
  RightSession,
  ModalContainer,
} from './all.style';

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
}

export const Web: FC<ButtonProps> = ({ buttonType }) => {
  return (
    <Container>
      <FormikStepper
        initialValues={{
          email: '',
          password: '',
          confirm_password: '',
          other_idiom: '',
          other_deficiency: '',
          deficiencies: [],
          isPcd: false,
          use_terms: '',
          profilePicture: null,
          curriculum: null,
          medicalReport: null,
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
            accessibility_resources_description: '',
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

        <FormikStep validationSchema={schemaStep08}>
          <Step08 />
        </FormikStep>

        {/* <FormikStep>
          <Step09 />
        </FormikStep> */}

        <FormikStep validationSchema={schemaStep10}>
          <Step10 />
        </FormikStep>

        <FormikStep validationSchema={schemaStep11}>
          <Step11 />
        </FormikStep>
      </FormikStepper>
    </Container>
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

  const history = useHistory();
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const [waitModal, setWaitModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);

  const [error, setError] = useState<ErrorObject | undefined>(undefined);

  const { data: socialNetworks } = useSocialNetworksLabfaz();

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const handleSubmit = (values: any) => {
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

      setWaitModal(true);

      SignUp(values).then(
        () => {
          setWaitModal(false);
          setEmailModal(true);
        },
        (err) => {
          setWaitModal(false);
          setError(err.message);
          setErrorModal(true);
        }
      );
    } else {
      setStep((currentStep) => currentStep + 1);
    }
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <ModalContainer isOpen={waitModal}>
          <div className="confirmEmailContainer">
            <h1>Realizando cadastro...</h1>
          </div>
        </ModalContainer>

        <ModalContainer isOpen={emailModal}>
          <div className="confirmEmailContainer">
            <h1>Confirme seu email para verificar a conta</h1>

            <div className="socialMedias">
              {socialNetworks?.youtube && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href={socialNetworks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutubeSquare />
                </a>
              )}
              {socialNetworks?.facebook && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href={socialNetworks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookSquare />
                </a>
              )}
              {socialNetworks?.twitter && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href={socialNetworks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitterSquare />
                </a>
              )}
              {socialNetworks?.googlePlus && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href={socialNetworks.googlePlus}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGooglePlusSquare />
                </a>
              )}
              {socialNetworks?.linkedin && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href={socialNetworks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              )}
              {socialNetworks?.instagram && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href={socialNetworks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagramSquare />
                </a>
              )}
            </div>

            <button type="button" onClick={() => history.push('/login')}>
              VOLTAR
            </button>
          </div>
        </ModalContainer>

        <ModalContainer isOpen={errorModal}>
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
        </ModalContainer>

        <FormTitle level={1} children="Cadastre-se" />
        <SessionContainer>
          <FormContainer>
            <div className="form">{currentChild}</div>
            <RightSession currentStep={step}>
              <div className="sessionContainer">
                <div className={`formSession ${0 < step && 'checked'}`}>
                  <label>1</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${1 < step && 'checked'}`}>
                  <label>2</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${2 < step && 'checked'}`}>
                  <label>3</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${3 < step && 'checked'}`}>
                  <label>4</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${4 < step && 'checked'}`}>
                  <label>5</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${5 < step && 'checked'}`}>
                  <label>6</label>
                  <FaRegCheckCircle />
                </div>
              </div>
            </RightSession>
            {step > 0 && (
              <BackButton
                type="button"
                onClick={() => setStep((currentStep) => currentStep - 1)}
              >
                VOLTAR
              </BackButton>
            )}
            <NextButton
              type={isLastStep() ? props.initialValues.buttonType : 'submit'}
            >
              {isLastStep() ? 'FINALIZAR' : 'AVANÇAR'}
            </NextButton>
          </FormContainer>
        </SessionContainer>
      </Form>
    </Formik>
  );
}
