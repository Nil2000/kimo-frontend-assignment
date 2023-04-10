export interface Activity{
  name:string,
  description:string,
  image:string,
  activities:ActivityItem[]
}

export interface ActivityItem{
  name:string,
}