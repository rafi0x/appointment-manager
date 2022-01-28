<template>
  <div>
    <div class="fixed inset-0 z-50 flex justify-center items-center">
      <div class="flex flex-col max-w-5xl rounded-lg shadow-lg bg-white">
        <div class="p-5">
          <div class="flex justify-center items-center">
            <h3 class="p-1 text-2xl font-semibold underline">Appointment Details</h3>
          </div>
        </div>


        <div class="container flex flex-col mx-auto w-full items-center justify-center bg-white px-16">
          <ul class="flex flex-col divide divide-y">
            <li class="flex flex-row">
              <div class="select-none flex flex-1 items-center p-4">
                <div class="text-gray-600 text-md mr-10">
                  Patient Name:
                </div>
                <p class="font-medium">
                  {{ name }}
                </p>
              </div>
            </li>
            <li class="flex flex-row">
              <div class="select-none flex flex-1 items-center p-4">
                <div class="text-gray-600 text-md mr-10">
                  Serial Number:
                </div>
                <p class="font-medium">
                  {{ serial }}
                </p>
              </div>
            </li>
            <li class="flex flex-row">
              <div class="select-none flex flex-1 items-center p-4">
                <div class="text-gray-600 text-md mr-10">
                  Contact Number:
                </div>
                <a class="font-medium" :href="`tel:${contact}`">
                  {{ contact }}
                </a>
              </div>
            </li>
            <li class="flex flex-row">
              <div class="select-none flex flex-1 items-center p-4">
                <div class="text-gray-600 text-md mr-10">
                  Status:
                </div>

                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{'bg-yellow-100 text-yellow-800': stats === 'Active', 'bg-green-100 text-green-800': stats === 'Completed', 'bg-red-100 text-red-800': stats === 'Cancelled'}">
                    {{ stats }}
                  </span>

              </div>
            </li>

          </ul>
        </div>



        <div class="p-6 flex justify-end items-center">
          <button @click="$emit('closeModal')" type="submit" class="py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Close
          </button>
        </div>
      </div>
    </div>
    <div class="opacity-20 fixed inset-0 z-40 bg-black"></div>

  </div>

</template>

<script>
export default {
  name: "modal",
  props: {
    patientName: String,
    serialNumber: Number,
    contacts: String,
    status: String,
  },
  data() {
    return {
      name: this.patientName,
      serial: this.serialNumber,
      contact: this.contacts,
      stats: this.status
    }
  }
}
</script>
