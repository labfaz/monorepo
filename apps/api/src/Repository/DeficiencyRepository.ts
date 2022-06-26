import { EntityRepository, Repository } from "typeorm"
import { Deficiency } from "Entities/Deficiency"

@EntityRepository(Deficiency)
export class DeficiencyRepository extends Repository<Deficiency> {

  findByName(name: string) {
    return this.findOne({ name })
  }
}

export default DeficiencyRepository
