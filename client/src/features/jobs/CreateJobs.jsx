import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "react-calendar/dist/Calendar.css";
import JobCreateForm from "./JobCreateForm";
import ChooseImageComponent from "./ChooseImageComponent";
export default function CreateJobs() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DashboardLayout>
        <section className="create_job_sec py-2">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                {/* <div class="head">
                  <h6 class="px-3">Upload CSV</h6>
                  <hr />
                </div> */}
              </div>
              <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                <ChooseImageComponent />
              </div>

              <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                <JobCreateForm />
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </div>
  );
}
