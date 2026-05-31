# Product Requirement Document (PRD)

# Mini Recruitment Dashboard

## Overview

Mini Recruitment Dashboard adalah aplikasi ATS (Applicant Tracking System) sederhana yang digunakan oleh recruiter atau HR untuk mengelola lowongan pekerjaan dan memonitor proses rekrutmen kandidat.

Sistem ini difokuskan untuk kebutuhan internal perusahaan dan tidak menyediakan portal publik untuk pelamar.

---

# Goals

Menyediakan dashboard sederhana yang memungkinkan recruiter untuk:

* Mengelola lowongan pekerjaan
* Mengelola kandidat
* Memantau pipeline rekrutmen
* Melihat statistik proses hiring secara real-time

---

# Target Users

### Recruiter

Memiliki akses penuh untuk:

* Login
* Membuat lowongan
* Mengelola kandidat
* Mengubah status kandidat

---

# Core Features

## Authentication

### Login

Input:

* Email
* Password

Output:

* JWT Access Token

Catatan:

* Tidak ada fitur register
* Menggunakan akun dummy dari database seed

---

## Dashboard

Menampilkan ringkasan:

### Statistics Cards

* Total Jobs
* Total Candidates
* Total Applications

### Pipeline Summary

* Applied
* Interview
* Hired

---

## Job Management

Recruiter dapat:

### View Jobs

Menampilkan:

* Job Title
* Department
* Location
* Status
* Created Date

### Search Job

Search berdasarkan:

* Job Title

### Filter Job

Filter berdasarkan:

* Open
* Closed

### Add Job

Recruiter dapat membuat lowongan baru.

### Edit Job

Recruiter dapat mengubah data lowongan.

### Delete Job

Recruiter dapat menghapus lowongan.

---

## Candidate Management

Recruiter dapat:

### View Candidates

Menampilkan:

* Candidate Name
* Email
* Phone
* Applied Job
* Current Stage

### Add Candidate

Membuat kandidat baru.

### Edit Candidate

Mengubah informasi kandidat.

### Delete Candidate

Menghapus kandidat.

---

## Candidate Pipeline

Tahapan rekrutmen:

### Applied

Kandidat baru masuk.

### Interview

Kandidat lolos screening.

### Hired

Kandidat diterima.

Recruiter dapat memindahkan kandidat antar stage.

---

# Success Metrics

Recruiter dapat:

* Login ke sistem
* Mengelola lowongan
* Mengelola kandidat
* Memindahkan kandidat ke pipeline berikutnya
* Melihat statistik rekrutmen

Dengan UI yang responsif dan mudah digunakan.

---

# Future Scope

Tidak termasuk dalam technical test:

* Multi Role
* Upload CV
* Email Notification
* Public Career Page
* Assessment Test
* Interview Scheduling
* Offer Letter Management
