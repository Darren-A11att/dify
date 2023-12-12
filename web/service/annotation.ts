import { del, get, post } from './base'
import type { AnnotationItemBasic } from '@/app/components/app/annotation/type'

export const fetchAnnotationList = (appId: string, params: Record<string, any>) => {
  return get(`apps/${appId}/annotations`, { params })
}

export const addAnnotation = (appId: string, body: AnnotationItemBasic) => {
  return post(`apps/${appId}/annotations`, { body })
}

export const editAnnotation = (appId: string, annotationId: string, body: AnnotationItemBasic) => {
  return post(`apps/${appId}/annotations/${annotationId}`, { body })
}

export const delAnnotation = (appId: string, annotationId: string) => {
  return del(`apps/${appId}/annotations/${annotationId}`)
}
