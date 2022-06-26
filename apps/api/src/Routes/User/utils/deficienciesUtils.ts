import { In } from "typeorm";

import { Deficiency } from "Entities/Deficiency";
import DeficiencyRepository from "Repository/DeficiencyRepository";

export async function separeteNewAndExistentDeficiencies(
    deficienciesArray: Record<string, unknown>[], 
    deficiencyRepo: DeficiencyRepository
  ) {
  const customDeficiencies = <string[]>deficienciesArray.filter(e => e?.name && !e?.id).map(e => e.name);
  const deficienciesId = <string[]>deficienciesArray.filter(e => e?.id).map(e => e.id);

  let deficiencies: Deficiency[]
    if(deficienciesId.length)
      deficiencies = await deficiencyRepo.find({where: {id: In(deficienciesId)}});
    else
      deficiencies = []

  return {
    new: customDeficiencies,
    existent: deficiencies,
  }
}
