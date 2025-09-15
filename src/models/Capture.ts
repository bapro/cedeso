import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Incident from "./Incident";

@Table({
  tableName: "captures",
  timestamps: true,
})
class Capture extends Model {
  @ForeignKey(() => Incident)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  incidentId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  eventLocation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  eventLocationOther?: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  authorities!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  authoritiesOther?: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  authorityVehicles!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  authorityVehiclesOther?: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  eventType!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  eventTypeOther?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  communityReaction!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  communityReactionOther?: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  violenceIndicators!: string[];

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  attemptedResources!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  attemptedResourcesOther?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  organizationName?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  organizationPhone?: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  takenTo!: string[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  takenToOther?: string;

  @Column({
    type: DataType.STRING(2),
    allowNull: false,
  })
  hasDisability!: string;

  @Column({
    type: DataType.STRING(2),
    allowNull: false,
  })
  isLGBTQ!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.JSON, // Change to JSON to store array of attachments
    allowNull: true,
  })
  attachments?: string[]; // Change from attachment to attachments

  @BelongsTo(() => Incident)
  incident!: Incident;
}

export default Capture;
