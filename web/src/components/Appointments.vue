<template>
  <div class="flex flex-col py-16 px-20">

    <div class="pb-2 flex justify-between">
      <div class="max-w-md">
        <input
            v-model="search"
            type="text"
            name="price"
            id="price"
            class="w-auto h-9 p-3 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search"
        />
        <div class="ml-5 relative inline-flex">
          <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
          <select class="border border-gray-300 rounded-md text-gray-600 h-9 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none" v-model="whatToShow">
            <option value="" disabled selected hidden>Filter</option>
            <option value="active">Active</option>
            <option value="complete">Completed</option>
            <option value="cancel">Cancelled</option>
          </select>
        </div>
        <div class="inline-block rounded-md font-medium border border-solid cursor-pointer text-center ml-2 px-1.5 py-0 text-lg text-white bg-red-600 border-red-600 hover:bg-red-800 hover:border-red-800" v-if="whatToShow" @click="clearFilter">X</div>
      </div>

      <div class="max-w-md inline-flex">
        <span v-if="isAdmin" class="text-white font-black">Hello Admin</span>
        <div class="ml-5 flex w-full">
          <button v-if="isAdmin" @click="modals.addNewModalShow = !modals.addNewModalShow" type="button" class="py-2 px-4 mr-3  bg-white focus:ring-green-500 focus:ring-offset-green-200 text-black w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-md">
            new
          </button>

          <button v-if="!isAdmin" @click="modals.loginModalShow = !modals.loginModalShow" type="button" class="py-2 px-4 bg-white focus:ring-green-500 focus:ring-offset-green-200 text-black w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-md">
            Login
          </button>

          <button v-if="isAdmin" @click="logout" type="button" class="py-2 px-4 bg-white focus:ring-green-500 focus:ring-offset-green-200 text-black w-full transition ease-in duration-200 text-center text-base font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-md">
            Logout
          </button>
        </div>

      </div>

    </div>

    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheduled
              </th>
              <th v-if="isAdmin" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change Status
              </th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(person, index) in showData(whatToShow)" :key="index" @click="openDetailsModal(index)">

              <td class="px-6 py-4 whitespace-nowrap">

                <div class="text-sm font-medium text-gray-900">
                  {{ person.patientName }}
                </div>

              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div class="text-sm text-gray-500">
                  {{ person.contact }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ person.status }}
                  </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ person.serial }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ person.scheduled ? person.scheduled.split('T')[0]: '' }}
              </td>

            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <details-modal v-if="modals.detailsModalShow" :patientName="detailsModalData.name" :serialNumber="detailsModalData.serial" :contacts="detailsModalData.contact" :status="detailsModalData.status" @closeModal="modal.detailsModalShow = !modal.detailsModalShow;"/>

    <login-modal v-if="modals.loginModalShow" @close-login-modal="modals.loginModalShow = !modals.loginModalShow" @userLoggedIn="authUser"/>

    <add-new-modal v-if="modals.addNewModalShow" @close-add-new-modal="modals.addNewModalShow = !modals.addNewModalShow" @adding-success="reCallApi('addNewModalShow')"/>

  </div>

</template>

<script>
import DetailsModal from "./DetailsModal";
import LoginModal from "./LoginModal";
import AddNewModal from "./AddNewModal";
import JwtDecode from 'vue-jwt-decode';
export default {
  name: 'Appointments',
  components: {
    "details-modal":DetailsModal,
    "login-modal": LoginModal,
    "add-new-modal": AddNewModal
  },
  data() {
    return {
      isAdmin: false,
      authToken: '',
      search: '',
      whatToShow: '',
      modals: {
        loginModalShow: false,
        addNewModalShow: false,
        detailsModalShow: false,
      },
      detailsModalData: {},
      people: []
    }
  },
  async mounted() {
    //call the api
    await this.getDataFromApi()
    this.checkTokenExpire()
  },
  computed: {
    //search with name and contact
    filteredList() {
      return this.people.filter(post => {
        return post.patientName.toLowerCase().includes(this.search.toLowerCase()) || post.contact.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    //sort by status
    sortActive: function () {
      return this.people.filter(post => {
        return post.status.toLowerCase() === this.whatToShow;
      })
    }
  },
  methods: {
    //call api for getting all appointments and update to state
    async getDataFromApi(){
      const request = await fetch('http://localhost:8083/api/appointments', { method: "GET" });
      const response = await request.json();
      if(response) {
        this.people = response.data;
      }
    },
    //re call the api on new add and login for re render
    async reCallApi(modalName){
      this.modals[modalName] = false;
      await this.getDataFromApi()
    },
    //for sorting and searching
    showData() {
      if(this.whatToShow) {
        return this.sortActive;
      }else {
        return this.filteredList;
      }
    },
    //clear sorting
    clearFilter() {
      this.whatToShow = ''
    },
    //give specific clicked appointment data to detail-modal
    openDetailsModal(index) {
      this.modals.detailsModalShow = !this.modals.detailsModalShow;
      this.detailsModalData = {
        name: this.people[index].patientName,
        serial: this.people[index].serial,
        contact: this.people[index].contact,
        status: this.people[index].status
      }
    },
    authUser(){
      this.modals.loginModalShow = false
      const token = localStorage.getItem('token');
      this.isAdmin = true;
      this.authToken = token;
    },
    checkTokenExpire(){
      const token = localStorage.getItem('token');
      if(token){
        const decoded = JwtDecode(token);
        if(decoded.expiresIn < Date.now()){
          this.logout()
        }
      }
    },
    logout() {
      this.isAdmin = false;
      this.authToken = ""
      localStorage.removeItem('token')
    }
  }
}

</script>