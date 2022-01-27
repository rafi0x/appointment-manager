<template>
  <div>
    <div class="fixed inset-0 z-50 flex justify-center items-center">

      <div class="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
        <div class="px-4 py-8 sm:px-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300">
              </div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
                <span class="px-2 text-black font-semibold bg-white ">
                   Add New Appointment
                </span>
            </div>
          </div>
          <div class="mt-6">
            <div class="w-full space-y-6">
              <div class="w-full">
                <div class=" relative ">
                  <input type="text" v-model="patientName" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Patient Name"/>
                </div>
              </div>
              <div class="w-full">
                <div class=" relative ">
                  <input type="text" v-model="contact" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" placeholder="Patient Contact"/>
                </div>
              </div>
              <div class="w-full">
                <div class=" relative ">
                  <input type="date" v-model="scheduled" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"/>
                </div>
              </div>
              <div>
                  <span class="block inline-flex w-full rounded-md shadow-sm">
                      <button type="button" @click="$emit('close-add-new-modal')" class="py-2 mr-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                          Close
                      </button>
                      <button type="button" @click="saveAppointment" class="py-2 px-4 ml-2  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                          Save
                      </button>
                  </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    <div class="opacity-20 fixed inset-0 z-40 bg-black"></div>

  </div>

</template>

<script>
export default {
  name: "add-new",
  data() {
    return {
      patientName: '',
      contact: '',
      scheduled: '',
      errors: {}
    }
  },
  methods: {
      async saveAppointment() {
        const request = await fetch('http://localhost:8083/api/appointments', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientName: this.patientName,
            contact: this.contact,
            scheduled: this.scheduled
          })
        })
        const response = await request.json();
        if(response.success){
          this.$emit('adding-success')
        } else if (response.clientErr) {
          this.errors = {
            name: 'Name required',
            contact: 'Contact required',
            scheduled: 'Date required'
          }
        } else {
          this.errors = {
            err: 'Server error, please try again'
          }
        }
      }
  }
}
</script>
