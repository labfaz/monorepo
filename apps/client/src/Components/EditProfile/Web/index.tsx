import React, { FC, useRef, useState } from 'react'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'

import { FaRegCheckCircle } from 'react-icons/fa'
import * as yup from 'yup'

import {
  facebookUserRegex,
  instagramUserRegex,
  linkedinUserRegex,
  tiktokUserRegex,
  twitterUserRegex,
  youtubeUserRegex,
} from 'Utils/regex'

import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { STEP4_2 } from './STEP4_2'
import { Step5 } from './Step5'
import { Step6 } from './Step6'
import { Step7 } from './Step7'
import { Step8 } from './Step8'
import { Step9 } from './Step9'

import {
  Container,
  FormTitle,
  FormContainer,
  NextButton,
  BackButton,
  RightSession,
  SessionContainer,
  ErrorModalContainer
} from './style'

import { useHistory } from 'react-router'
import { User } from 'Context/LoggedUserToken'
import { EditProfile } from 'Api/EditProfile'
import { ErrorObject } from 'Api'
import { curriculumMaxSize, profilePictureMaxSize } from 'Utils/userUtils'

interface ButtonProps {
  buttonType: 'button' | 'submit' | 'reset' | undefined
  data?: User
  token: string
}

export const Web: FC<ButtonProps> = ({ buttonType, data, token }) => {
  return (
    <Container>
      <FormikStepper
        initialValues={{
          email: data?.email,
          password: "",
          confirm_password: "",
          old_password: "",
          other_idiom: "",
          other_deficiency: "",
          deficiencies: data?.deficiencies.map((deficiency) => deficiency.name),
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
        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              name: yup.string().required("Nome obrigat??rio"),
              social_name: yup.string(),
              artistic_name: yup.string(),
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
              // .required('Org??o expedidor obrigat??rio')
              address: yup.object({
                cep: yup.string(), //.required('CEP obrigat??rio'),
                neighbourhood: yup.string(), //.required('Bairro obrigat??rio'),
                number: yup.string(), //.required('N??mero obrigat??rio'),
                complement: yup.string(), //.required('Endere??o obrigat??rio'),
                residency: yup.string(), //.required('Campo obrigat??rio'),
                state: yup
                  .string()
                  // .required('Estado obrigat??rio')
                  .default("null"),
                city: yup.string().required("Cidade obrigat??ria"),
              }),
            }),
          })}
        >
          <Step1 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              gender: yup.string().required("Campo obrigat??rio"),
              race: yup.string().required("Campo obrigat??rio"),
              sexual_orientation: yup.string().required("Campo obrigat??rio"),
              gender_specific: yup.string().required("Campo obrigat??rio"),
            }),
          })}
        >
          <Step2 />
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
                  (value && value.size <= profilePictureMaxSize)
              ),
            email: yup
              .string()
              .email("Email inv??lido")
              .required("Email obrigat??rio"),
            artist: yup.object({
              show_name: yup.string().required("Como quer ser chamado?"),
              contact: yup.object({
                whatsapp: yup.string(),
                twitter: yup
                  .string()
                  .trim()
                  .matches(twitterUserRegex, "formato inv??lido"),
                facebook: yup
                  .string()
                  .trim()
                  .matches(facebookUserRegex, "formato inv??lido"),
                instagram: yup
                  .string()
                  .trim()
                  .matches(instagramUserRegex, "formato inv??lido"),
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
          <Step3 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            deficiencies: yup.array(),
             medicalReport: yup.string().nullable(),
          })}
        >
          <STEP4_2 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                formation: yup.string().required("Forma????o obrigat??ria"),
                idiom: yup.array(),
              }),
            }),
          })}
        >
          <Step4 />
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
                  (value && value.size <= curriculumMaxSize)
              ),
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  technical_formation: yup
                    .string()
                    .required("Campo obrigat??rio"),
                  name: yup.string().required("Campo obrigat??rio"),
                  started_year: yup.string().required("Campo obrigat??rio"),
                }),
              }),
            }),
          })}
        >
          <Step5 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                areas: yup.object({
                  describe: yup.string().required("Descri????o obrigat??ria"),
                }),
              }),
            }),
          })}
        >
          <Step6 />
        </FormikStep>

        <FormikStep>
          <Step7 />
        </FormikStep>

        <FormikStep
          validationSchema={yup.object({
            artist: yup.object({
              technical: yup.object({
                is_drt: yup.boolean().required("Campo obrigat??rio"),
                is_ceac: yup.boolean().required("Campo obrigat??rio"),
                is_cnpj: yup.boolean().required("Campo obrigat??rio"),
              }),
            }),
          })}
        >
          <Step8 />
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
          <Step9 />
        </FormikStep>
      </FormikStepper>
    </Container>
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

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const modalRef = useRef<HTMLInputElement | null>(null)

  const [error, setError] = useState<ErrorObject | undefined>(undefined)
  const [errorModal, setErrorModal] = useState(false)

  const history = useHistory()

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values: any) => {
        if (isLastStep()) {
          setButtonDisabled(true)

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
            })
            .catch((err) => [setError(err.message), setErrorModal(true), setButtonDisabled(false)])
        } else {
          setStep((currentStep) => currentStep + 1)
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
                <div className={`formSession ${5 < step && 'checked'}`}>
                  <label>4</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${7 < step && 'checked'}`}>
                  <label>5</label>
                  <FaRegCheckCircle />
                </div>
                <div className={`formSession ${8 < step && 'checked'}`}>
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
              {isLastStep() ? 'FINALIZAR' : 'AVAN??AR'}
            </NextButton>
          </FormContainer>
        </SessionContainer>
      </Form>
    </Formik>
  )
}
