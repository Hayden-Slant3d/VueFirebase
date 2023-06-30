import Swal from "sweetalert2"

export class Pop {

  /**
   * @typedef {{isAxiosError: boolean, message: string, response:{ data: any}}} AxiosError
   */

  /**
    * @param {string | 'Sure you want t...'} title The title.
    * @param {string | 'You wont be abl...'} text The body.
    * @param {string | 'Confirm'} confirmButtonText The confirm button.
    * @param {string | 'warning'} icon Pop icon
  */
  static async confirm(title = 'Sure you want to do this?', text = "You won't be able to revert this!", confirmButtonText = 'Confirm', icon = 'warning') {
    try {
      // @ts-ignore
      const res = await Swal.fire({
        title,
        text,
        icon,
        confirmButtonText,
        allowOutsideClick: false,
        showCancelButton: true,
      })
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  /**
   * @param {string | 'Warning!'} title The title.
   * @param {string | 'warning'} icon success | error | info | warning | question
   * @param {string | 'center-right'} position |
   * top | top-left | top-right | center | center-left | center-right | bottom | bottom-left | bottom-right
   * @param {number | 3000} timer in milliseconds.
   */
  // @ts-ignore
  static toast(title = 'Warning!', icon = 'warning', position = 'top-right', timer = 3000) {
    // @ts-ignore
    Swal.fire({
      toast: true,
      icon,
      title,
      position,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  /**
   * @param { AxiosError | Error | string | any } error An Error Object.
   */
  static error(error) {
    if (error.isAxiosError) {
      const { response } = error
      const errorObj = (response.data ? response.data.error : response.data) || { message: 'Invalid Request ' + response.status }
      if (!errorObj) {
        return this.toast(error.message)
      }
      this.toast(errorObj.message || errorObj.error || 'error')
    } else {
      this.toast(error.message || error, 'error')
    }
  }

  
}
