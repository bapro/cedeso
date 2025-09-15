import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Incident from './Incident';

@Table({
  tableName: 'profiles',
  timestamps: true
})
class Profile extends Model {
  @ForeignKey(() => Incident)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  incidentId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  profileType!: string;

  @BelongsTo(() => Incident)
  incident!: Incident;
}

export default Profile;