import { ComponentType } from '@/components/repetitive-sections/repetitive-sections-wrapper'
import { panelClient, type ApiResponse } from '../client'

export interface CitysLivingData {
  id: string
  mediaId: string
  componentType: ComponentType
  thumbnail: string
  title?: string
  subtitle?: string
  description?: string
}

export async function fetchCitysLivingData(
  lang: string = 'tr'
): Promise<ApiResponse<CitysLivingData[]>> {
  return panelClient.get<CitysLivingData[]>(`/citysLiving.php?lang=${lang}`)
}
