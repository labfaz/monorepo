import * as yup from "yup";

export const addUserDeficiencySchema = yup.object().shape({
  id: yup.string().required()
})

export const createDeficiencySchema = yup.object().shape({
  name: yup.string().required()
})

const addOrCreateUserDeficiency = yup.mixed()

addOrCreateUserDeficiency.when({
  is: (v: Record<string, unknown>) => v?.id,
  then: addUserDeficiencySchema
});
addOrCreateUserDeficiency.when({
  is: (v: Record<string, unknown>) => v?.name,
  then: createDeficiencySchema
});

export {
  addOrCreateUserDeficiency
}
