export interface IncidentFormData {
  reporterType: string;
  otherReporterType?: string;
  phone?: string;
  date: Date;
  time: Date;
  ampm: string;
  province: string;
  municipio: string;
  community: string;
  females: number;
  males: number;
  totalAffected: number;
  userName: string;
}

export interface ProfileFormData {
  profileType: string;
}

export interface CaptureFormData {
  eventLocation: string;
  eventLocationOther?: string;
  authorities: string[];
  authoritiesOther?: string;
  authorityVehicles: string[];
  authorityVehiclesOther?: string;
  eventType: string[];
  eventTypeOther?: string;
  communityReaction: string;
  communityReactionOther?: string;
  violenceIndicators: string[];
  attemptedResources: string[];
  attemptedResourcesOther?: string;
  organizationName?: string;
  organizationPhone?: string;
  takenTo: string[];
  takenToOther?: string;
  hasDisability: string;
  isLGBTQ: string;
  description: string;
  // attachment?: string;
  attachments?: string[]; // Change from attachment to attachments
}

export interface CompleteFormData {
  incident: IncidentFormData;
  profile: ProfileFormData;
  capture: CaptureFormData;
}
