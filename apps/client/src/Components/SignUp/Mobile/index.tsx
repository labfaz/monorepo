import React, { FC, useRef, useState } from 'react';
import { Formik, FormikConfig, FormikValues, Form } from 'formik';
import * as yup from 'yup';

import {
  FaYoutubeSquare,
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
  FaLinkedin,
  FaInstagramSquare,
} from 'react-icons/fa';

import { SignUp } from 'Api/SignUp';

import { Step1 } from './Step01';
import { Step2 } from './Step02';
import { Step3 } from './Step03';
import { Step4 } from './Step04';
import { Step5 } from './Step05';
import { Step6 } from './Step06';
import { Step7 } from './Step07';
import { Step8 } from './Step08';
import { Step9 } from './Step09';
import { Step10 } from './Step10';
import { Step11 } from './Step11';
import { Step12 } from './Step12';
import { Step13 } from './Step13';
import { Step14 } from './Step14';
import { Step15 } from './Step15';
import { Step16 } from './Step16';
import { Step17 } from './Step17';
import { Step18 } from './Step18';

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

import {
  facebookUserRegex,
  instagramUserRegex,
  linkedinUserRegex,
  tiktokUserRegex,
  twitterUserRegex,
  youtubeUserRegex,
} from 'Utils/regex';
import { useSocialNetworksLabfaz } from 'Api/SocialNetworksLabfaz';
import { useHistory } from 'react-router';
import { ErrorObject } from 'Api';
import { curriculumMaxSize, profilePictureMaxSize } from 'Utils/userUtils';

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
          other_deficiency: '',
          deficiencies: [],
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
        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              name: yup.string().required('Nome obrigatório'),
              social_name: yup.string(),
              artistic_name: yup.string(),
            }),
          })}
        >
          <Step1 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            profilePicture: yup
              .mixed()
              .required('Foto obrigatória')
              .test(
                'fileSize',
                'Arquivo muito grande',
                (value) => value && value.size <= profilePictureMaxSize
              ),
            artist: yup.object({
              show_name: yup.string().required('Como quer ser chamado?'),
            }),
          })}
        >
          <Step2 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              cpf: yup
                .string()
                // .required('Cpf obrigatório')
                .min(11, 'Cpf incompleto'),
              birthday: yup
                .string()
                .required('Data de nascimento obrigatório')
                .min(8, 'Data incompleta'),
              rg: yup
                .string()
                // .required('Rg é obrigatório')
                .min(7, 'Rg incompleto'),
              expedition_department: yup.string(),
              // .required('Orgão expedidor obrigatório'),
            }),
          })}
        >
          <Step3 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              gender: yup.string().required('Campo obrigatório'),
              gender_specific: yup.string().required('Campo obrigatório'),
            }),
          })}
        >
          <Step4 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              sexual_orientation: yup.string().required('Campo obrigatório'),
            }),
          })}
        >
          <Step5 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              race: yup.string().required('Campo obrigatório'),
            }),
          })}
        >
          <Step6 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            email: yup
              .string()
              .email('Email inválido')
              .required('Email obrigatório'),
            artist: yup.object({
              contact: yup.object({
                whatsapp: yup.string(),
                facebook: yup
                  .string()
                  .trim()
                  .matches(facebookUserRegex, 'formato inválido'),
                instagram: yup
                  .string()
                  .trim()
                  .matches(instagramUserRegex, 'formato inválido'),
              }),
            }),
          })}
        >
          <Step7 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              contact: yup.object({
                twitter: yup
                  .string()
                  .trim()
                  .matches(twitterUserRegex, 'formato inválido'),
                linkedin: yup
                  .string()
                  .trim()
                  .matches(linkedinUserRegex, 'formato inválido'),
                tiktok: yup
                  .string()
                  .trim()
                  .matches(tiktokUserRegex, 'formato inválido'),
                youtube: yup
                  .string()
                  .trim()
                  .matches(youtubeUserRegex, 'formato inválido'),
              }),
            }),
          })}
        >
          <Step8 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              address: yup.object({
                city: yup.string().required('Cidade obrigatória'),
                state: yup
                  .string()
                  // .required('Estado obrigatório')
                  .default('Distrito Federal'),
                residency: yup.string().required('Campo obrigatório'),
              }),
            }),
          })}
        >
          <Step9 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              address: yup.object({
                cep: yup.string(), //.required('CEP obrigatório'),
                neighbourhood: yup.string(), //.required('Bairro obrigatório'),
                number: yup.string(), //.required('Número obrigatório'),
                complement: yup.string(), //.required('Endereço obrigatório'),
              }),
            }),
          })}
        >
          <Step10 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                formation: yup.string().required('Formação obrigatória'),
                idiom: yup.array(),
              }),
            }),
          })}
        >
          <Step11 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            isPcd: yup.boolean(),
            deficiencies: yup.array(),
            artist: yup.object({
              medicalReport: yup.string().nullable(),
              accessibility_resources_description: yup.string().nullable(),
            }),
          })}
        >
          <Step12 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  name: yup.string().required('Campo obrigatório'),
                  started_year: yup.string().required('Campo obrigatório'),
                }),
              }),
            }),
          })}
        >
          <Step13 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  technical_formation: yup
                    .string()
                    .required('Campo obrigatório'),
                }),
              }),
            }),
          })}
        >
          <Step14 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            curriculum: yup
              .mixed()
              .test(
                'fileSize',
                'Arquivo muito grande',
                (value) =>
                  value === null || (value && value.size <= curriculumMaxSize)
              ),
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  describe: yup.string().required('Campo obrigatório'),
                }),
              }),
            }),
          })}
        >
          <Step15 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                is_drt: yup.boolean().required('Campo obrigatório'),
                is_ceac: yup.boolean().required('Campo obrigatório'),
              }),
            }),
          })}
        >
          <Step16 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                is_cnpj: yup.boolean().required('Campo obrigatório'),
              }),
            }),
          })}
        >
          <Step17 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            password: yup
              .string()
              .required('Senha obrigatória')
              .min(6, 'Senha no minimo 6 digítos'),
            confirm_password: yup
              .string()
              .required('Confirme password')
              .when('password', {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                  .string()
                  .oneOf([yup.ref('password')], 'Senhas não são iguais.'),
              }),
            use_terms: yup.string().required('Termos de uso obrigatório'),
          })}
        >
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

  const [email, setEmail] = useState('');
  const { data: socialNetworks } = useSocialNetworksLabfaz();

  const modalRef = useRef<HTMLInputElement | null>(null);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  const handleRedirect = () => {
    history.push('/login');
    // console.log('redirecionado para login')
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
              setEmail(values.email);
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
                  <h2>
                    O email com as instrucoes para ativacao e verificacao da
                    conta foram enviados para {email}
                  </h2>

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
