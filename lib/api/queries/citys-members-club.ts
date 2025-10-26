import { ComponentType } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { panelClient, type ApiResponse } from '../client'

export interface CitysMembersClubData {
  id: string
  mediaId: string
  componentType: ComponentType
  thumbnail: string
  title?: string
  subtitle?: string
  description?: string
}

export async function fetchCitysMembersClubData(
  lang: string = 'tr'
): Promise<ApiResponse<CitysMembersClubData[]>> {
  return panelClient.get<CitysMembersClubData[]>(
    `/membersClub.php?lang=${lang}`
  )
}
