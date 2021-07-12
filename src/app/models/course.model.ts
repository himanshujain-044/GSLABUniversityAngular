export interface InsCourse {
  courseName: string;
  duration: string;
  prerequisites: string;
}

export interface GetCourses {
  data: data,
  status:string
}
interface data {
  courseName: string;
  duration: string;
  instructorName: string;
  prerequisites: string;
  numberOfStuEnrolled: Number;
  createdBy: string;
}
