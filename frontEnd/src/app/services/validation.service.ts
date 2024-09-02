import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  onlyNumbersRegex = /^[0-9]+$/
  onlyLettersRegex = /^[A-Za-z]+$/
  lettersAndNumbersRegex = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+$/

  onlyNumbers(data: string){
    return this.onlyNumbersRegex.test(data)
  }

  onlyLetters(data: string){
    return this.onlyLettersRegex.test(data)
  }

  lettersAndNumbers(data: string){
    return this.lettersAndNumbersRegex.test(data)
  }

  validateFormData(formData: FormData, validationErrors: any[]): boolean{
    let allOk: boolean = true

    const uId = formData.get('userId')
    const username = formData.get('username')
    const password = formData.get('password')
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const workerCode = formData.get('workerCode')
    const department = formData.get('department')

    if(!uId || uId.toString().trim() == '' || uId.toString().length < 11){
      allOk = false
      validationErrors.push()
      return allOk
    }

    if(!username || username.toString().trim() == ''){
      allOk = false
      return allOk
    }

    if(!password || password.toString().trim() == '' || password.toString().length < 8){
      allOk = false
      return allOk
    }

    if(!firstName || firstName.toString().trim() == ''){
      allOk = false
      return allOk
    }

    if(!lastName || lastName.toString().trim() == ''){
      allOk = false
      return allOk
    }

    if(!workerCode || workerCode.toString().trim() == '' || workerCode.toString().length < 4){
      allOk = false
      return allOk
    }

    if(!department || department.toString().trim() == '' || department.toString().length < 5){
      allOk = false
      return allOk
    }

    return allOk
  }
}
