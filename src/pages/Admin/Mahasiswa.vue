<template>
  <!-- eslint-disable no-mixed-spaces-and-tabs -->
  <div class="dashboard">
    <NavbarAdmin :widthContent="width" />
    <div :class="`content ${width > 992 ? '' : 'hide'}`">
      <div class="section">
        <div class="card-shadow mb-3">
          <div class="p-3">
            <div
              class="d-flex flex-wrap justify-content-between align-items-center"
            >
              <div class="title-content">Data Staff</div>
              <div class="d-flex">
                <a
                  href="#"
                  type="button"
                  class="btn btn-success me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#tambah"
                  @click="openDropify"
                >
                  + Tambah
                </a>
                <!-- <button type="button" class="btn btn-warning text-white">
                  Import Excel
                </button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="card-shadow mb-3" v-if="dataFakultas && dataProdi">
          <div class="p-3">
            <div class="d-flex align-items-end justify-content-between">
              <div class="d-flex">
                <div class="me-2" style="max-width: 200px;">
                  <label class="form-label">Perusahaan</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="filter.fakultas"
                    @change="filterData"
                  >
                    <option value="" selected disabled
                      >- Pilih Perusahaan -</option
                    >
                    <option
                      :value="fakultas.uuid"
                      v-for="(fakultas, idFakultas) in dataFakultas.data"
                      :key="idFakultas"
                      >{{ fakultas.nama }}</option
                    >
                  </select>
                </div>
                <div class="me-2" style="max-width: 200px;">
                  <label class="form-label">Kantor Cabang</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="filter.prodi"
                    @change="filterData"
                  >
                    <option value="" selected disabled
                      >- Pilih Kantor Cabang -</option
                    >
                    <option
                      :value="prodi.uuid"
                      v-for="(prodi, idProdi) in dataProdi.data"
                      :key="idProdi"
                      >{{ prodi.nama }}</option
                    >
                  </select>
                </div>
                <div class="me-2" style="max-width: 200px;">
                  <label class="form-label">Departemen</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="filter.gugus"
                    @change="filterData"
                  >
                    <option value="" selected disabled
                      >- Pilih Departemen -</option
                    >
                    <option
                      :value="gugus.uuid"
                      v-for="(gugus, idGugus) in dataGugus"
                      :key="idGugus"
                      >{{ gugus.name }}</option
                    >
                  </select>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-danger mt-3 mt-md-0"
                v-if="isFilter"
                @click="resetFilterData"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
        <div class="card-shadow mb-3">
          <div class="p-3">
            <Loader
              text="Sedang memuat data mahasiswa."
              v-if="!dataMahasiswa"
            />
            <div class="table-responsive" v-else>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">NAMA</th>
                    <th scope="col">KANTOR CABANG</th>
                    <th scope="col">PERUSAHAAN</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">TELEPON</th>
                    <th scope="col">AKSI</th>
                  </tr>
                </thead>
                <tbody v-if="dataMahasiswa">
                  <tr
                    class="align-middle"
                    v-for="(items, index) in dataMahasiswa.data"
                    :key="index"
                  >
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td>
                      <div>
                        <div class="d-flex align-items-center">
                          <div
                            class="image d-flex align-items-center justify-content-center"
                          >
                            <img :src="items.foto" alt="" />
                          </div>
                          <div class="ms-3">
                            <div v-if="items.nama" class="main-text">
                              {{ items.nama }}
                            </div>
                            <div class="sub-text">{{ items.nim }}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div v-if="items.prodi">
                          <div class="main-text">{{ items.prodi.nama }}</div>
                        </div>
                        <div class="sub-text" v-if="items.gugus">
                          {{ items.gugus.name }}
                        </div>
                        <div class="sub-text" v-else></div>
                      </div>
                    </td>
                    <td>
                      <div v-if="items.prodi">
                        {{ items.prodi.fakultas.nama }}
                      </div>
                      <div v-else>No Fakultas</div>
                    </td>
                    <td>{{ items.email }}</td>
                    <td>{{ items.nohp }}</td>
                    <td>
                      <div class="d-flex">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm me-2"
                          @click="openEditMahasiswa(items.uuid)"
                          data-bs-toggle="modal"
                          data-bs-target="#lihatModal"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning btn-sm text-white me-2"
                          @click="openEditMahasiswa(items.uuid)"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          <i class="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="hapusMahasiswa(items.uuid, items.nama)"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination
              :data="dataMahasiswa"
              ammount="mahasiswa"
              :function="navigation"
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
    <div
      class="modal fade"
      id="lihatModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="max-width: 750px;">
        <div
          class="modal-content"
          style="border: none;border-radius: 20px !important;"
        >
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div class="modal-body modal-tambah">
            <div class="judul-modal-tambah">
              <h3>Detail Staff</h3>
            </div>
            <hr />
            <Loader
              text="Sedang memuat detail staff."
              v-if="!editMahasiswaData && loaderPopUp"
            />
            <form action="" v-if="editMahasiswaData">
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nama"
                      >Nama <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        readonly
                        type="text"
                        v-model="editMahasiswaData.nama"
                        name="nama"
                        id="nama"
                        class="form-control"
                        placeholder="Nama Staff"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.nama.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.nama.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nim"
                      >NIP <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        readonly
                        type="number"
                        v-model="editMahasiswaData.nim"
                        name="nim"
                        id="nim"
                        class="form-control"
                        placeholder="Nomor Induk Pegawai"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.nim.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.nim.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="email"
                      >Email <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        readonly
                        type="email"
                        v-model="editMahasiswaData.email"
                        name="email"
                        id="email"
                        class="form-control"
                        placeholder="example@gmail.com"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.email.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.email.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nomor"
                      >Nomor Telepon <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        readonly
                        type="number"
                        v-model="editMahasiswaData.nohp"
                        name="nomor"
                        id="nomor"
                        class="form-control"
                        placeholder="081234567890"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.nohp.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.nohp.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="jeniskelamin">Jenis Kelamin</label>
                    <div class="check-error">
                      <select
                        class="form-select"
                        name="jeniskelamin"
                        id="jeniskelamin"
                        v-model="editMahasiswaData.jenis_kelamin"
                      >
                        <option value="" selected disabled
                          >Pilih Jenis Kelamin</option
                        >
                        <option value="PEREMPUAN">Perempuan</option>
                        <option value="LAKI-LAKI">Laki - Laki</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="tgllahir">Tanggal Lahir</label>
                    <div class="check-error">
                      <input
                        readonly
                        type="date"
                        name="tgllahir"
                        v-model="editMahasiswaData.tgllahir"
                        id="tgllahir"
                        class="form-control"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.tgllahir.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.tgllahir.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="prodi"
                      >Kantor Cabang <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        disabled
                        name="prodi"
                        v-model="editMahasiswaData.prodi_id"
                        id="prodi"
                        class="form-select"
                      >
                        <option value="" selected>Pilih Kantor Cabang</option>
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataProdi.data"
                          :key="index"
                          >{{ items.nama }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.prodi_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.prodi_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="gugus"
                      >Departemen <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        disabled
                        name="gugus"
                        v-model="editMahasiswaData.gugus_id"
                        id="gugus"
                        class="form-select"
                      >
                        <option value="" selected>Pilih Departemen</option>
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataGugus"
                          :key="index"
                          >{{ items.name }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.gugus_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.gugus_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="fakultas"
                      >Perusahaan <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        disabled
                        name="fakultas"
                        v-model="editMahasiswaData.prodi.fakultas.uuid"
                        id="fakultas"
                        class="form-select"
                        @change="getProdiEdit"
                      >
                        <option value="" selected>Pilih Perusahaan</option>
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataFakultas.data"
                          :key="index"
                          >{{ items.nama }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.fakultas_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.fakultas_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="alamat">Alamat Staff</label>
                    <div class="check-error">
                      <textarea
                        readonly
                        name="alamat"
                        v-model="editMahasiswaData.alamat"
                        id="alamat"
                        style="height: 72px;"
                        cols="30"
                        rows="4"
                        class="form-control"
                        placeholder="Masukkan Alamat"
                      ></textarea>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.alamat.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.alamat.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="foto">Foto Staff</label>
                    <img
                      :src="editMahasiswaData.foto"
                      class="img-show"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-lg-12 footer-modal">
                  <div class="d-flex justify-content-end">
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      class="btn btn-outline-primary"
                      >Batal</a
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="max-width: 750px;">
        <div
          class="modal-content"
          style="border: none;border-radius: 20px !important;"
        >
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div class="modal-body modal-tambah">
            <div class="judul-modal-tambah">
              <h3>Edit Staff</h3>
            </div>
            <hr />
            <form
              action=""
              v-if="editMahasiswaData"
              @submit.prevent="editMahasiswa"
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nama"
                      >Nama <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="text"
                        v-model="editMahasiswaData.nama"
                        name="nama"
                        id="nama"
                        class="form-control"
                        placeholder="Nama Mahasiswa"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.nama.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.nama.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nim"
                      >NIP <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="number"
                        v-model="editMahasiswaData.nim"
                        name="nim"
                        id="nim"
                        class="form-control"
                        placeholder="Nomor Induk Pegawai"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.nim.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.nim.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="email"
                      >Email <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="email"
                        v-model="editMahasiswaData.email"
                        name="email"
                        id="email"
                        class="form-control"
                        placeholder="example@gmail.com"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.email.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.email.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      style="background: white;"
                      type="password"
                      class="form-control"
                      id="password"
                      name="password"
                      v-model="editMahasiswaData.password"
                    />
                    <small class="text-warning"
                      >Kosongi bila tidak ingin merubah password</small
                    >
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nomor"
                      >Nomor Telepon <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="number"
                        v-model="editMahasiswaData.nohp"
                        name="nomor"
                        id="nomor"
                        class="form-control"
                        placeholder="081234567890"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.nohp.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.nohp.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="jeniskelamin">Jenis Kelamin</label>
                    <div class="check-error">
                      <select
                        class="form-select"
                        name="jeniskelamin"
                        id="jeniskelamin"
                        v-model="editMahasiswaData.jenis_kelamin"
                      >
                        <option value="" selected disabled
                          >Pilih Jenis Kelamin</option
                        >
                        <option value="PEREMPUAN">Perempuan</option>
                        <option value="LAKI-LAKI">Laki - Laki</option>
                      </select>
                      <small
                        :class="
                          `text-danger ${
                            validationEdit.jenis_kelamin.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.jenis_kelamin.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 edited">
                  <div class="form-group">
                    <label for="tgllahir">Tanggal Lahir</label>
                    <div class="check-error">
                      <input
                        type="date"
                        name="tgllahir"
                        v-model="editMahasiswaData.tgllahir"
                        id="tgllahir"
                        class="form-control"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.tgllahir.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.tgllahir.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6" v-if="editMahasiswaData.prodi">
                  <div class="form-group">
                    <label for="fakultas"
                      >Perusahaan <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        name="fakultas"
                        v-model="editMahasiswaData.prodi.fakultas.uuid"
                        id="fakultas"
                        class="form-select"
                        @change="getProdiEdit"
                      >
                        <option value="" disabled selected
                          >Pilih Perusahaan</option
                        >
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataFakultas.data"
                          :key="index"
                          >{{ items.nama }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.fakultas_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.fakultas_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="prodi"
                      >Kantor Cabang <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        name="prodi"
                        v-model="editMahasiswaData.prodi_id"
                        id="prodi"
                        class="form-select"
                      >
                        <option value="" disabled selected
                          >Pilih Kantor Cabang</option
                        >
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataProdi.data"
                          :key="index"
                          >{{ items.nama }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.prodi_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.prodi_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="gugus"
                      >Departemen <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        name="gugus"
                        v-model="editMahasiswaData.gugus_id"
                        id="gugus"
                        class="form-select"
                      >
                        <option value="" selected>Pilih Departemen</option>
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataGugus"
                          :key="index"
                          >{{ items.name }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.gugus_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.gugus_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="alamat">Alamat Staff</label>
                    <div class="check-error">
                      <textarea
                        name="alamat"
                        v-model="editMahasiswaData.alamat"
                        id="alamat"
                        style="height: 72px;"
                        cols="30"
                        rows="4"
                        class="form-control"
                        placeholder="Masukkan Alamat"
                      ></textarea>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationEdit.alamat.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationEdit.alamat.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="foto">Foto Staff</label>
                    <input
                      type="file"
                      :data-default-file="editMahasiswaData.foto"
                      name="foto"
                      id="fotomahasiswaEdit"
                      class="dropify"
                    />
                  </div>
                </div>
                <div class="col-lg-12 footer-modal">
                  <div class="d-flex justify-content-end">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style="margin-right: 24px;"
                    >
                      Edit
                    </button>
                    <a
                      href="#"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      class="btn btn-outline-primary"
                      >Batal</a
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      v-if="dataProdi !== null && dataGugus !== null && dataFakultas !== null"
      id="tambah"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="max-width: 750px;">
        <div
          class="modal-content"
          style="border: none;border-radius: 20px !important;"
        >
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <div class="modal-body modal-tambah">
            <div class="judul-modal-tambah">
              <h3>Tambah Staff</h3>
            </div>
            <hr />
            <form action="" @submit.prevent="tambahMahasiswa">
              <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nama"
                      >Nama <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="text"
                        v-model="tambah.nama"
                        name="nama"
                        id="nama"
                        class="form-control"
                        placeholder="Nama Staff"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.nama.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.nama.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nim"
                      >NIP <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="number"
                        v-model="tambah.nim"
                        name="nim"
                        id="nim"
                        class="form-control"
                        placeholder="Nomor Induk Pegawai"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.nim.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.nim.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="email"
                      >Email <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="email"
                        v-model="tambah.email"
                        name="email"
                        id="email"
                        class="form-control"
                        placeholder="example@gmail.com"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.email.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.email.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="nomor"
                      >Nomor Telepon <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <input
                        type="number"
                        v-model="tambah.nomor"
                        name="nomor"
                        id="nomor"
                        class="form-control"
                        placeholder="081234567890"
                      />
                      <small
                        :class="
                          `text-danger ${
                            validationTambah.nomor.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.nomor.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="jeniskelamin">Jenis Kelamin</label>
                    <div class="check-error">
                      <select
                        class="form-select"
                        name="jeniskelamin"
                        id="jeniskelamin"
                        v-model="tambah.jenis_kelamin"
                      >
                        <option value="" selected disabled
                          >Pilih Jenis Kelamin</option
                        >
                        <option value="PEREMPUAN">Perempuan</option>
                        <option value="LAKI-LAKI">Laki - Laki</option>
                      </select>
                      <small
                        :class="
                          `text-danger ${
                            validationTambah.jenis_kelamin.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.jenis_kelamin.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="tgllahir">Tanggal Lahir</label>
                    <div class="check-error">
                      <input
                        type="date"
                        name="tgllahir"
                        v-model="tambah.tgllahir"
                        id="tgllahir"
                        class="form-control"
                      />
                      <small
                        :class="
                          `text-danger ${
                            validationTambah.tgllahir.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.tgllahir.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group" v-if="dataGugus !== null">
                    <label for="gugus"
                      >Departemen <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        name="gugus"
                        v-model="tambah.gugus"
                        id="gugus"
                        class="form-select"
                      >
                        <option value="" selected>Pilih Departemen</option>
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataGugus"
                          :key="index"
                          >{{ items.name }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.gugus_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.gugus_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6" v-if="dataFakultas">
                  <div class="form-group">
                    <label for="fakultas"
                      >Perusahaan <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        name="fakultas"
                        v-model="tambah.fakultas"
                        id="fakultas"
                        class="form-select"
                        @change="getProdi"
                      >
                        <option value="" disabled selected
                          >Pilih Perusahaan</option
                        >
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in dataFakultas.data"
                          :key="index"
                          >{{ items.nama }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.fakultas_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.fakultas_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group" v-if="tambah.prodiTemp">
                    <label for="prodi"
                      >Kantor Cabang <span class="text-info">*</span></label
                    >
                    <div class="check-error">
                      <select
                        name="prodi"
                        v-model="tambah.prodi"
                        id="prodi"
                        class="form-select"
                      >
                        <option value="" disabled selected
                          >Pilih Kantor Cabang</option
                        >
                        <option
                          :value="items.uuid"
                          v-for="(items, index) in tambah.prodiTemp"
                          :key="index"
                          >{{ items.nama }}</option
                        >
                      </select>
                      <small
                        :class="
                          `text-danger ${
                            validationTambah.prodi_id.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.prodi_id.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="alamat">Alamat Staff</label>
                    <div class="check-error">
                      <textarea
                        name="alamat"
                        v-model="tambah.alamat"
                        id="alamat"
                        style="height: 72px;"
                        cols="30"
                        rows="4"
                        class="form-control"
                        placeholder="Masukkan Alamat"
                      ></textarea>
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.alamat.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.alamat.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label for="foto">Foto Staff</label>
                    <div class="check-error">
                      <input
                        type="file"
                        name="foto"
                        id="fotomahasiswa"
                        class="dropify"
                      />
                      <small
                        :class="
                          `text-danger d-flex ${
                            validationTambah.foto.status === true
                              ? 'd-none'
                              : 'd-flex'
                          }`
                        "
                        >{{ validationTambah.foto.message }}</small
                      >
                    </div>
                  </div>
                </div>
                <div class="col-lg-12 footer-modal">
                  <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" style="margin-right: 24px;">
                      Tambah
                    </button>
                    <a
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      class="btn btn-outline-primary"
                      >Batal</a
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { mapState } from "vuex";
/* eslint-env jquery */

export default {
  computed: {
    ...mapState(["url"]),
  },
  data: function() {
    return {
      loaderPopUp: false,
      validationTambah: {
        status: true,
        message: null,
        jenis_kelamin: {
          status: true,
          messages: null,
        },
        nama: {
          status: true,
          message: null,
        },
        nim: {
          status: true,
          message: null,
        },
        email: {
          status: true,
          message: null,
        },
        nomor: {
          status: true,
          message: null,
        },
        tgllahir: {
          status: true,
          message: null,
        },
        prodi_id: {
          status: true,
          message: null,
        },
        gugus_id: {
          status: true,
          message: null,
        },
        fakultas_id: {
          status: true,
          message: null,
        },
        alamat: {
          status: true,
          message: null,
        },
        foto: {
          status: true,
          message: null,
        },
      },
      validationEdit: {
        status: true,
        message: null,
        nim: {
          status: true,
          message: null,
        },
        nama: {
          status: true,
          message: null,
        },
        email: {
          status: true,
          message: null,
        },
        nohp: {
          status: true,
          message: null,
        },
        tgllahir: {
          status: true,
          message: null,
        },
        prodi_id: {
          status: true,
          message: null,
        },
        gugus_id: {
          status: true,
          message: null,
        },
        fakultas_id: {
          status: true,
          message: null,
        },
        alamat: {
          status: true,
          message: null,
        },
        password: {
          status: true,
          message: null,
        },
        jenis_kelamin: {
          status: true,
          message: null,
        },
      },
      isFilter: false,
      fotoEdit: null,
      editMahasiswaData: null,
      width: null,
      dataMahasiswa: null,
      dataProdi: null,
      dataGugus: null,
      dataFakultas: null,
      tambah: {
        jenis_kelamin: "",
        nim: null,
        nama: null,
        prodi: "",
        alamat: null,
        gugus: "",
        fakultas: "",
        email: null,
        nomor: null,
        foto: null,
        tgllahir: null,
        prodiTemp: null,
      },
      filter: {
        fakultas: "",
        prodi: "",
        gugus: "",
      },
    };
  },
  methods: {
    navigation(url) {
      if (url) {
        this.dataMahasiswa = null;

        axios
          .get(url, {
            headers: {
              Authorization: localStorage.token,
            },
          })
          .then((res) => {
            console.log(res);
            this.dataMahasiswa = res.data.data;

            $(document).ready(function() {
              $(".table").DataTable({
                pageLength: 25,
                ordering: false,
                paging: false,
                info: false,
              });
            });
          })
          .catch((err) => {
            console.log(err);
            // localStorage.clear();
          });
      }
    },
    filterData() {
      this.dataMahasiswa = null;
      this.isFilter = true;
      axios
        .get(
          `${this.url}bemkm/superadmin/mahasiswa/?fakultas_id=${this.filter.fakultas}&prodi_id=${this.filter.prodi}&gugus_id=${this.filter.gugus}`,
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          this.dataMahasiswa = res.data.data;
          $(document).ready(function() {
            $(".table").DataTable({
              pageLength: 25,
              ordering: false,
              paging: false,
              info: false,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetFilterData() {
      this.dataMahasiswa = null;
      this.filter.fakultas = "";
      this.filter.prodi = "";
      this.isFilter = false;

      axios
        .get(`${this.url}bemkm/superadmin/mahasiswa`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((result) => {
          console.log(result);
          this.dataMahasiswa = result.data.data;
          $(document).ready(function() {
            $(".table").DataTable({
              pageLength: 25,
              ordering: false,
              paging: false,
              info: false,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadEdit(asd) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        this.editMahasiswaData.foto = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
    openDropify() {
      $(".dropify").dropify({
        messages: {
          default: "Unggah Foto Staff",
          replace: "Timpa dan upload gambar",
          remove: "hapus",
          error: "Ooops, telah terjadi kesalahan.",
        },
      });
    },
    editMahasiswa() {
      if (
        this.editMahasiswaData.nim &&
        this.editMahasiswaData.nama &&
        this.editMahasiswaData.alamat &&
        this.editMahasiswaData.gugus_id &&
        this.editMahasiswaData.email &&
        this.editMahasiswaData.prodi_id &&
        this.editMahasiswaData.user_id &&
        this.editMahasiswaData.jenis_kelamin &&
        this.editMahasiswaData.tgllahir &&
        this.editMahasiswaData.nohp
      ) {
        if (document.getElementById("fotomahasiswaEdit").files[0]) {
          this.uploadEdit(
            document.getElementById("fotomahasiswaEdit").files[0]
          );
        } else {
          this.editMahasiswaData.foto = null;
        }
        setTimeout(() => {
          axios
            .put(
              `${this.url}bemkm/superadmin/mahasiswa/${this.editMahasiswaData.uuid}`,
              {
                nim: this.editMahasiswaData.nim,
                nama: this.editMahasiswaData.nama,
                alamat: this.editMahasiswaData.alamat,
                gugus_id: this.editMahasiswaData.gugus_id,
                email: this.editMahasiswaData.email,
                prodi_id: this.editMahasiswaData.prodi_id,
                foto: this.editMahasiswaData.foto,
                user_id: this.editMahasiswaData.user_id,
                tgllahir: this.editMahasiswaData.tgllahir,
                nohp: this.editMahasiswaData.nohp,
                jenis_kelamin: this.editMahasiswaData.jenis_kelamin,
                password: this.editMahasiswaData.password,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((result) => {
              console.log(result);
              if (result.data.success) {
                Swal.fire(
                  "Berhasil Edit!",
                  `Akun Staff telah berhasil diedit!`,
                  "success"
                )
                  .then((a) => {
                    if (a.isConfirmed) {
                      window.location.reload();
                    }
                  })
                  .catch((err) => {
                    window.location.reload();
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              Swal.fire("Gagal", `${err.response.data.message}`, "warning");
            });
        }, 500);
      }
      if (!this.editMahasiswaData.jenis_kelamin) {
        this.validationEdit.jenis_kelamin.status = false;
        this.validationEdit.jenis_kelamin.message =
          "Jenis Kelamin Staff harus dipilih!";
      } else {
        this.validationEdit.jenis_kelamin.status = true;
        this.validationEdit.jenis_kelamin.message = null;
      }
      if (!this.editMahasiswaData.nama) {
        this.validationEdit.nama.status = false;
        this.validationEdit.nama.message = "Nama Staff harus diisi!";
      } else {
        this.validationEdit.nama.status = true;
        this.validationEdit.nama.message = null;
      }
      if (!this.editMahasiswaData.nim) {
        this.validationEdit.nim.status = false;
        this.validationEdit.nim.message = "NIM Staff harus diisi!";
      } else {
        this.validationEdit.nim.status = true;
        this.validationEdit.nim.message = null;
      }
      if (!this.editMahasiswaData.email) {
        this.validationEdit.email.status = false;
        this.validationEdit.email.message = "Email harus diisi!";
      } else {
        this.validationEdit.email.status = true;
        this.validationEdit.email.message = null;
      }
      if (!this.editMahasiswaData.nohp) {
        this.validationEdit.nohp.status = false;
        this.validationEdit.nohp.message = "Nomor Telepon harus diisi!";
      } else {
        this.validationEdit.nohp.status = true;
        this.validationEdit.nohp.message = null;
      }
      if (!this.editMahasiswaData.tgllahir) {
        this.validationEdit.tgllahir.status = false;
        this.validationEdit.tgllahir.message = "Tanggal Lahir harus diisi!";
      } else {
        this.validationEdit.tgllahir.status = true;
        this.validationEdit.tgllahir.message = null;
      }
      if (
        !this.editMahasiswaData.prodi_id ||
        this.editMahasiswaData.prodi_id === ""
      ) {
        this.validationEdit.prodi_id.status = false;
        this.validationEdit.prodi_id.message = "Kantor Cabang harus diisi!";
      } else {
        this.validationEdit.prodi_id.status = true;
        this.validationEdit.prodi_id.message = null;
      }
      if (
        !this.editMahasiswaData.gugus_id ||
        this.editMahasiswaData.gugus_id === ""
      ) {
        this.validationEdit.gugus_id.status = false;
        this.validationEdit.gugus_id.message = "Departemen harus diisi!";
      } else {
        this.validationEdit.gugus_id.status = true;
        this.validationEdit.gugus_id.message = null;
      }
      if (
        !this.editMahasiswaData.prodi.fakultas_id ||
        !this.editMahasiswaData.prodi.fakultas_id === ""
      ) {
        this.validationEdit.fakultas_id.status = false;
        this.validationEdit.fakultas_id.message = "Perusahaan harus dipilih!";
      } else {
        this.validationEdit.fakultas_id.status = true;
        this.validationEdit.fakultas_id.message = null;
      }
      if (!this.editMahasiswaData.alamat) {
        this.validationEdit.alamat.status = false;
        this.validationEdit.alamat.message = "Alamat harus dipilih!";
      } else {
        this.validationEdit.alamat.status = true;
        this.validationEdit.alamat.message = null;
      }
    },
    openEditMahasiswa(uuidMahasiswa) {
      this.loaderPopUp = true;
      setTimeout(() => {
        $(".dropify").dropify({
          messages: {
            default: "Unggah Foto Staff",
            replace: "Timpa dan upload gambar",
            remove: "hapus",
            error: "Ooops, telah terjadi kesalahan.",
          },
        });
      }, 200);
      axios
        .get(`${this.url}bemkm/superadmin/mahasiswa/${uuidMahasiswa}`, {
          headers: {
            Authorization: localStorage.token,
          },
        })
        .then((result) => {
          this.loaderPopUp = false;
          this.editMahasiswaData = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hapusMahasiswa(uuidMahasiswa, namaMahasiswa) {
      Swal.fire({
        title: `Hapus Akun Staff ${namaMahasiswa}`,
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${this.url}bemkm/superadmin/mahasiswa/${uuidMahasiswa}`, {
              headers: {
                Authorization: localStorage.token,
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                Swal.fire(
                  "Deleted!",
                  `Akun Staff ${namaMahasiswa} telah dihapus!`,
                  "success"
                )
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    window.location.reload();
                    console.log(err);
                  });
              } else {
                Swal.fire("Gagal!", res.data.message, "warning");
              }
            })
            .catch((err) => {
              Swal.fire("Gagal", `${err.response.data.message}`, "warning");
            });
        }
      });
    },
    upload(asd) {
      var reader = new FileReader();
      reader.onload = (e) => {
        console.log(e);
        this.tambah.foto = e.target.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      };
      reader.onerror = function(error) {
        alert(error);
      };
      reader.readAsDataURL(asd);
    },
    getProdi() {
      this.tambah.prodi = "";
      axios
        .get(
          `${this.url}bemkm/superadmin/fakultas/prodi/` + this.tambah.fakultas,
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          this.tambah.prodiTemp = result.data.data;
          this.editMahasiswaData.prodi_id = result.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProdiEdit() {
      axios
        .get(
          `${this.url}bemkm/superadmin/fakultas/prodi/${this.editMahasiswaData.prodi.fakultas.uuid}`,
          {
            headers: {
              Authorization: localStorage.token,
            },
          }
        )
        .then((result) => {
          console.log(result);
          this.dataProdi = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tambahMahasiswa() {
      if (
        this.tambah.nim &&
        this.tambah.nama &&
        this.tambah.email &&
        this.tambah.gugus &&
        this.tambah.prodi !== "" &&
        this.tambah.alamat &&
        this.tambah.fakultas !== "" &&
        this.tambah.tgllahir &&
        this.tambah.nomor &&
        this.tambah.jenis_kelamin &&
        document.getElementById("fotomahasiswa").files[0]
      ) {
        if (document.getElementById("fotomahasiswa").files[0]) {
          this.upload(document.getElementById("fotomahasiswa").files[0]);
        } else {
          this.tambah.foto = null;
        }
        setTimeout(() => {
          axios
            .post(
              `${this.url}bemkm/superadmin/mahasiswa`,
              {
                jenis_kelamin: this.tambah.jenis_kelamin,
                nim: this.tambah.nim,
                nama: this.tambah.nama,
                email: this.tambah.email,
                gugus_id: this.tambah.gugus,
                prodi_id: this.tambah.prodi,
                alamat: this.tambah.alamat,
                foto: this.tambah.foto,
                fakultas_id: this.tambah.fakultas,
                tgllahir: this.tambah.tgllahir,
                nohp: this.tambah.nomor,
              },
              {
                headers: {
                  Authorization: localStorage.token,
                },
              }
            )
            .then((result) => {
              console.log(result);
              if (result.data.success) {
                Swal.fire("Berhasil", `Berhasil Tambah Staff`, "success")
                  .then(() => {
                    window.location.reload();
                  })
                  .catch(() => {
                    window.location.reload();
                  });
              } else {
                Swal.fire("Gagal", `${result.data.message}`, "warning");
              }
            })
            .catch((err) => {
              Swal.fire("Gagal", `${err.response.data.message}`, "warning");
            });
        }, 500);
      }
      if (!this.tambah.nama) {
        this.validationTambah.nama.status = false;
        this.validationTambah.nama.message = "Nama Staff harus diisi!";
      } else {
        this.validationTambah.nama.status = true;
        this.validationTambah.nama.message = null;
      }
      if (!this.tambah.jenis_kelamin) {
        this.validationTambah.jenis_kelamin.status = false;
        this.validationTambah.jenis_kelamin.message =
          "Jenis Kelamin harus dipilih!";
      } else {
        this.validationTambah.jenis_kelamin.status = true;
        this.validationTambah.jenis_kelamin.message = null;
      }
      if (!this.tambah.nim) {
        this.validationTambah.nim.status = false;
        this.validationTambah.nim.message = "NIM Staff harus diisi!";
      } else {
        this.validationTambah.nim.status = true;
        this.validationTambah.nim.message = null;
      }
      if (!this.tambah.email) {
        this.validationTambah.email.status = false;
        this.validationTambah.email.message = "Email Staff harus diisi!";
      } else {
        this.validationTambah.email.status = true;
        this.validationTambah.email.message = null;
      }
      if (!this.tambah.nomor) {
        this.validationTambah.nomor.status = false;
        this.validationTambah.nomor.message =
          "Nomor Telepon Staff harus diisi!";
      } else {
        this.validationTambah.nomor.status = true;
        this.validationTambah.nomor.message = null;
      }
      if (!this.tambah.tgllahir) {
        this.validationTambah.tgllahir.status = false;
        this.validationTambah.tgllahir.message =
          "Tanggal Lahir Staff harus diisi!";
      } else {
        this.validationTambah.tgllahir.status = true;
        this.validationTambah.tgllahir.message = null;
      }
      if (!this.tambah.alamat) {
        this.validationTambah.alamat.status = false;
        this.validationTambah.alamat.message = "Alamat Staff harus diisi!";
      } else {
        this.validationTambah.alamat.status = true;
        this.validationTambah.alamat.message = null;
      }
      if (!document.getElementById("fotomahasiswa").files[0]) {
        this.validationTambah.foto.status = false;
        this.validationTambah.foto.message = "Foto Staff harus diisi!";
      } else {
        this.validationTambah.foto.status = true;
        this.validationTambah.foto.message = null;
      }
      if (!this.tambah.prodi || this.tambah.prodi === "") {
        this.validationTambah.prodi_id.status = false;
        this.validationTambah.prodi_id.message =
          "Kantor Cabang Staff harus dipilih!";
      } else {
        this.validationTambah.prodi_id.status = true;
        this.validationTambah.prodi_id.message = null;
      }
      if (!this.tambah.gugus || this.tambah.gugus === "") {
        this.validationTambah.gugus_id.status = false;
        this.validationTambah.gugus_id.message =
          "Departemmen Staff harus dipilih!";
      } else {
        this.validationTambah.gugus_id.status = true;
        this.validationTambah.gugus_id.message = null;
      }
      if (!this.tambah.fakultas || this.tambah.fakultas === "") {
        this.validationTambah.fakultas_id.status = false;
        this.validationTambah.fakultas_id.message =
          "Perusahaan Staff harus dipilih!";
      } else {
        this.validationTambah.fakultas_id.status = true;
        this.validationTambah.fakultas_id.message = null;
      }
    },
  },
  mounted() {
    this.width = $(document).width();
    axios
      .get(`${this.url}bemkm/superadmin/mahasiswa`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataMahasiswa = result.data.data;
        $(document).ready(function() {
          $(".table").DataTable({
            pageLength: 25,
            ordering: false,
            paging: false,
            info: false,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {
    $(".dropify").dropify({
      messages: {
        default: "Unggah Foto Staff",
        replace: "Timpa dan upload gambar",
        remove: "hapus",
        error: "Ooops, telah terjadi kesalahan.",
      },
    });
    axios
      .get(`${this.url}bemkm/superadmin/prodi`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataProdi = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.url}bemkm/superadmin/gugus-nonpaginate`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataGugus = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.url}bemkm/superadmin/fakultas`, {
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((result) => {
        console.log(result);
        this.dataFakultas = result.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.form-group .dropify-wrapper {
  border-color: rgba(221, 224, 228, 1) !important;
}
.modal input[type="text"],
.modal input[type="email"],
.modal input[type="number"],
.modal textarea {
  border: none !important;
}
.modal .form-control,
.modal .form-select {
  border-color: rgba(221, 224, 228, 1);
}
.modal-tambah {
  padding: 33px 33px 0 33px;
}
.modal-tambah form {
  padding-top: 16px;
}
.modal-tambah .form-control {
  height: 36px;
  border-radius: 8px !important;
  background: #f8f8f8;
}
.modal-tambah .form-control::placeholder {
  color: rgba(175, 181, 192, 1);
  font-weight: 400;
  font-size: 14px;
}
.judul-modal-tambah h3 {
  margin-bottom: 22px;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.48px;
}
</style>
