import React, { FC, useRef, useState } from 'react';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import { FaRegCheckCircle } from 'react-icons/fa';

import { Step01, schemaStep01 } from './Step1';
import { Step02, schemaStep02 } from './Step2';
import { Step03, schemaStep03 } from './Step3';
import { Step04, schemaStep04 } from './Step4';
import { Step05, schemaStep05 } from './Step5';
import { Step06, schemaStep06 } from './Step6';
import { Step07, schemaStep07 } from './Step7';
import { Step08, schemaStep08 } from './Step8';
import { Step09 } from './Step9';
import { Step10, schemaStep10 } from './Step10';
import { Step11, schemaStep11 } from './Step11';

import {
  Container,
  FormTitle,
  FormContainer,
  NextButton,
  BackButton,
  RightSession,
  SessionContainer,
  ErrorModalContainer,
} from './style';

import { useHistory } from 'react-router';
import { User } from 'Context/LoggedUserToken';
import { EditProfile } from 'Api/EditProfile';
import { ErrorObject } from 'Api';

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset' | undefined;
  data?: User;
  token: string;
}

export const Web: FC<ButtonProps> = ({ buttonType, data, token }) => {
  const dateFormatter = (date: Date | string | undefined) => {
    return date ? new Intl.DateTimeFormat('pt-BR').format(new Date(date)) : undefined
  }

  return (
    <Container>
      <FormikStepper
        initialValues={{
          email: data?.email,
          password: '',
          confirm_password: '',
          old_password: '',
          other_idiom: '',
          other_deficiency: '',
          // NOTE: comment out for now, causes white screen on prod
          // deficiencies: data?.deficiencies.map((deficiency) => deficiency.name),
          isPcd: data?.artist.medicalReport != null,
          use_terms: '',
          profilePicture: data?.artist.photo_url,
          curriculum: data?.artist.curriculum,
          medicalReport: data?.artist.medicalReport,
          Other_TechnicalArea: '',
          artist: {
            name: data?.artist.name,
            social_name: data?.artist.social_name,
            artistic_name: data?.artist.artistic_name,
            show_name: data?.artist.show_name,
            gender: data?.artist.gender,
            sexual_orientation: data?.artist.sexual_orientation,
            gender_specific: data?.artist.gender_specifics,
            other_gender: '',
            cpf: data?.artist.cpf ?? '',
            birthday: dateFormatter(data?.artist.birthday),
            rg: data?.artist.rg,
            expedition_department: data?.artist.expedition_department,
            race: data?.artist.race,
            accessibility_resources_description:
              data?.artist.accessibility_resources_description,
            address: {
              city: data?.artist.address.city,
              cep: data?.artist.address.cep,
              neighbourhood: data?.artist.address.neighbourhood,
              number: data?.artist.address.number ?? '0',
              complement: data?.artist.address.complement,
              residency: data?.artist.address.residency,
              state: data?.artist.address.state,
            },
            contact: {
              whatsapp: data?.artist.contact.whatsapp,
              twitter: data?.artist.contact.twitter,
              facebook: data?.artist.contact.facebook,
              instagram: data?.artist.contact.instagram,
              linkedin: data?.artist.contact.linkedin,
              tiktok: data?.artist.contact.tiktok,
              youtube: data?.artist.contact.youtube,
            },
            technical: {
              formation: data?.artist.technical.formation,
              is_drt: String(data?.artist.technical.is_drt),
              is_ceac: String(data?.artist.technical.is_ceac),
              is_cnpj: String(data?.artist.technical.is_cnpj),
              drt: data?.artist.technical.drt,
              ceac: data?.artist.technical.ceac,
              cnpj: data?.artist.technical.cnpj,
              // name_enterprise: '',
              cnpj_type: data?.artist.technical.cnpj_type,
              profession: data?.artist.technical.profession,
              areas: {
                technical_formation:
                  data?.artist.technical.area[0].technical_formation,
                name: data?.artist.technical.area[0].name,
                describe: data?.artist.technical.area[0].describe,
                started_year: data?.artist.technical.area[0].started_year,
                certificate: data?.artist.technical.area[0].certificate.map(
                  (certificate) => certificate.name
                ),
              },
              idiom: data?.artist.technical.idiom.map((idiom) => idiom.name),
            },
          },
          buttonType,
          token: token,
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
        <FormikStep>
          <Step09 />
        </FormikStep>
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

  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const modalRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<ErrorObject | undefined>(undefined);
  const [errorModal, setErrorModal] = useState(false);

  const history = useHistory();

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values: any) => {
        if (isLastStep()) {
          setButtonDisabled(true);

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

          EditProfile(values, values.token)
            .then(() => {
              history.push('/profile');
            })
            .catch((err) => [
              setError(err.message),
              setErrorModal(true),
              setButtonDisabled(false),
            ]);
        } else {
          setStep((currentStep) => currentStep + 1);
        }
      }}
    >
      <Form>
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
                <div className={`formSession ${6 < step && 'checked'}`}>
                  <label>4</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${8 < step && 'checked'}`}>
                  <label>5</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${9 < step && 'checked'}`}>
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
              disabled={buttonDisabled}
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
