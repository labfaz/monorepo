import React, { FC, useRef, useState } from 'react'
import { Formik, FormikConfig, FormikValues, Form } from 'formik'
import * as yup from 'yup'

import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Step5 } from './Step5'
import { Step6 } from './Step6'
import { Step7 } from './Step7'
import { Step8 } from './Step8'
import { Step9 } from './Step9'
import { Step10 } from './Step10'
import { Step11 } from './Step11'
import { Step12 } from './Step12'
import { STEP12_2 } from './Step12_2'
import { Step13 } from './Step13'
import { Step14 } from './Step14'
import { Step15 } from './Step15'
import { Step16 } from './Step16'

import {
  FormTitle,
  FormContainer,
  NextButton,
  SessionContainer,
  BackButton,
  ButtonContainer,
  FormHeader,
  RightSession,
  ErrorModalContainer
} from './style'

import {
  facebookUserRegex,
  instagramUserRegex,
  linkedinUserRegex,
  tiktokUserRegex,
  twitterUserRegex,
  youtubeUserRegex,
} from 'Utils/regex'
import { User } from 'Context/LoggedUserToken'
import { EditProfile } from 'Api/EditProfile'
import { useHistory } from 'react-router'
import { ErrorObject } from 'Api'

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset' | undefined
  data?: User
  token: string
}

const profileSize = 2 * 1024 * 1024
const curriculumSize = 10 * 1024 * 1024
// const medicalReportMaxSize = 10 * 1024 * 1024

export const Mobile: FC<ButtonProps> = ({ buttonType, data, token  }) => {
  return (
    <>
      <FormHeader />
      <FormikStepper
        initialValues={{
          email: data?.email,
          password: "",
          confirm_password: "",
          other_idiom: "",
          other_deficiency: "",
          deficiencies: data?.deficiencies,
          isPcd: data?.artist.medicalReport != null,
          use_terms: "",
          profilePicture: data?.artist.photo_url,
          curriculum: data?.artist.curriculum,
          medicalReport: data?.artist.medicalReport,
          Other_TechnicalArea: "",
          artist: {
            name: data?.artist.name,
            social_name: data?.artist.social_name,
            artistic_name: data?.artist.artistic_name,
            show_name: data?.artist.show_name,
            gender: data?.artist.gender,
            sexual_orientation: data?.artist.sexual_orientation,
            gender_specific: data?.artist.gender_specifics,
            other_gender: "",
            cpf: data?.artist.cpf,
            birthday: data?.artist.birthday,
            rg: data?.artist.rg,
            expedition_department: data?.artist.expedition_department,
            race: data?.artist.race,
            address: {
              city: data?.artist.address.city,
              cep: data?.artist.address.cep,
              neighbourhood: data?.artist.address.neighbourhood,
              number: data?.artist.address.number,
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
              // name_enterprise: data?.,
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
          token,
          buttonDisabled: false,
        }}
        onSubmit={() => {}}
      >
        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              name: yup.string().required("Nome obrigat??rio"),
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
              .test(
                "fileSize",
                "Arquivo muito grande",
                (value) =>
                  (value && !value.name) ||
                  value === null ||
                  (value && value.size <= profileSize)
              ),
            artist: yup.object({
              show_name: yup.string().required("Como quer ser chamado?"),
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
                // .required('Cpf obrigat??rio')
                .min(11, "Cpf incompleto"),
              birthday: yup
                .string()
                .required("Data de nascimento obrigat??rio")
                .min(8, "Data incompleta"),
              rg: yup
                .string()
                // .required('Rg ?? obrigat??rio')
                .min(7, "Rg incompleto"),
              expedition_department: yup.string(),
              // .required('Org??o expedidor obrigat??rio'),
            }),
          })}
        >
          <Step3 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              gender: yup.string().required("Campo obrigat??rio"),
              gender_specific: yup.string().required("Campo obrigat??rio"),
            }),
          })}
        >
          <Step4 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              sexual_orientation: yup.string().required("Campo obrigat??rio"),
            }),
          })}
        >
          <Step5 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              race: yup.string().required("Campo obrigat??rio"),
            }),
          })}
        >
          <Step6 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Email inv??lido")
              .required("Email obrigat??rio"),
            artist: yup.object({
              contact: yup.object({
                whatsapp: yup.string(),
                facebook: yup
                  .string()
                  .trim()
                  .matches(facebookUserRegex, "formato inv??lido"),
                instagram: yup
                  .string()
                  .trim()
                  .matches(instagramUserRegex, "formato inv??lido"),
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
                  .matches(twitterUserRegex, "formato inv??lido"),
                linkedin: yup
                  .string()
                  .trim()
                  .matches(linkedinUserRegex, "formato inv??lido"),
                tiktok: yup
                  .string()
                  .trim()
                  .matches(tiktokUserRegex, "formato inv??lido"),
                youtube: yup
                  .string()
                  .trim()
                  .matches(youtubeUserRegex, "formato inv??lido"),
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
                city: yup.string().required("Cidade obrigat??ria"),
                state: yup
                  .string()
                  .required("Estado obrigat??rio")
                  .default("Distrito Federal"),
                residency: yup.string(),
                // .required('Campo obrigat??rio'),
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
                cep: yup.string(), //.required('CEP obrigat??rio'),
                neighbourhood: yup.string(), //.required('Bairro obrigat??rio'),
                number: yup.string(), //.required('N??mero obrigat??rio'),
                complement: yup.string(), //.required('Endere??o obrigat??rio'),
              }),
            }),
          })}
        >
          <Step10 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            deficiencies: yup.array(),
             medicalReport: yup.string().nullable(),
          })}
        >
          <Step11 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  name: yup.string().required("Campo obrigat??rio"),
                  started_year: yup.string().required("Campo obrigat??rio"),
                }),
              }),
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
                  technical_formation: yup
                    .string()
                    .required("Campo obrigat??rio"),
                }),
              }),
            }),
          })}
        >
          <STEP12_2 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            curriculum: yup
              .mixed()
              .test(
                "fileSize",
                "Arquivo muito grande",
                (value) =>
                  (value && !value.name) ||
                  value === null ||
                  (value && value.size <= curriculumSize)
              ),
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  describe: yup.string().required("Campo obrigat??rio"),
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
                is_drt: yup.boolean().required("Campo obrigat??rio"),
                is_ceac: yup.boolean().required("Campo obrigat??rio"),
              }),
            }),
          })}
        >
          <Step14 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                is_cnpj: yup.boolean().required("Campo obrigat??rio"),
              }),
            }),
          })}
        >
          <Step15 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            old_password: yup.string().min(6, "Senha no minimo 6 dig??tos"),
            password: yup.string().min(6, "Senha no minimo 6 dig??tos"),
            confirm_password: yup.string().when("password", {
              is: (val) => (val && val.length > 0 ? true : false),
              then: yup
                .string()
                .oneOf([yup.ref("password")], "Senhas n??o s??o iguais."),
            }),
          })}
        >
          <Step16 />
        </FormikStep>
      </FormikStepper>
    </>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues & ButtonProps>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<
    FormikStepProps
  >[]

  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]

  const modalRef = useRef<HTMLInputElement | null>(null)

  const [error, setError] = useState<ErrorObject | undefined>(undefined)
  const [errorModal, setErrorModal] = useState(false)

  const history = useHistory()

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  const handleScroll = () => {
    window.scrollTo(0, 150)
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values: any) => {
        if (isLastStep()) {

          values.buttonDisabled = true

          if (values.other_idiom) {
            const index = values.artist.technical.idiom.indexOf('Outro')

            values.artist.technical.idiom.splice(index, 1)

            values.artist.technical.idiom.push(values.other_idiom)

            delete values.other_idiom
          }

          if (values.other_deficiency) {
            const index = values.deficiencies.indexOf('Outro')

            values.deficiencies.splice(index, 1)

            values.deficiencies.push(values.other_deficiency)

            delete values.other_deficiency
          }

          if (values.artist.other_gender) {
            values.artist.gender = values.artist.other_gender

            delete values.artist.other_gender
          }

          if (values.Other_TechnicalArea) {
            values.artist.technical.areas.name = values.Other_TechnicalArea

            delete values.Other_TechnicalArea
          }

          delete values.artist.other_gender

          delete values.use_terms

          EditProfile(values, values.token)
            .then(() => {
              history.push('/profile')
            }).catch(err => [setError(err.message), setErrorModal(true)])

          // console.log(values)
        } else {
          setStep((currentStep) => currentStep + 1)
        }
      }}
    >
      <Form>
        <FormTitle level={1} children="Cadastre-se" />
        {/* <SignUpText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porta
          ligula nibh, nec interdum nunc maximus at.
        </SignUpText> */}
        <SessionContainer>
          <FormContainer currentStep={step}>
            <div className="form">

            <ErrorModalContainer ref={modalRef} isOpen={errorModal} >
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

              <ButtonContainer currentStep={step}>
                {step > 0 && (
                  <BackButton
                    type="button"
                    onClick={() => setStep((currentStep) => currentStep - 1)}
                  >
                    VOLTAR
                  </BackButton>
                )}
                <NextButton
                  type={
                    isLastStep() ? props.initialValues.buttonType : 'submit'
                  }

                  onClick={() => handleScroll()}
                >
                  {isLastStep() ? 'FINALIZAR' : 'AVAN??AR'}
                </NextButton>
              </ButtonContainer>
            </div>
            <RightSession currentStep={step}>
              <div className="sessionContainer">
                <div className={`formSession ${0 < step && 'checked'}`}></div>
                <div className={`formSession ${1 < step && 'checked'}`}></div>
                <div className={`formSession ${2 < step && 'checked'}`}></div>
                <div className={`formSession ${3 < step && 'checked'}`}></div>
                <div className={`formSession ${4 < step && 'checked'}`}></div>
                <div className={`formSession ${5 < step && 'checked'}`}></div>
                <div className={`formSession ${6 < step && 'checked'}`}></div>
                <div className={`formSession ${7 < step && 'checked'}`}></div>
                <div className={`formSession ${8 < step && 'checked'}`}></div>
                <div className={`formSession ${9 < step && 'checked'}`}></div>
                <div className={`formSession ${10 < step && 'checked'}`}></div>
                <div className={`formSession ${11 < step && 'checked'}`}></div>
                <div className={`formSession ${12 < step && 'checked'}`}></div>
                <div className={`formSession ${13 < step && 'checked'}`}></div>
                <div className={`formSession ${14 < step && 'checked'}`}></div>
                <div className={`formSession ${15 < step && 'checked'}`}></div>
                <div className={`formSession ${16 <= step && 'checked'}`}></div>
              </div>
            </RightSession>
          </FormContainer>
        </SessionContainer>
      </Form>
    </Formik>
  )
}
