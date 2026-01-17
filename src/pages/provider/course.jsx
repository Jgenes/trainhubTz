import { useState } from "react";
import ProviderDashboardLayout from "./layouts/ProviderDashboardLayout";
import DataTable from "react-data-table-component";
import { FaEye, FaEdit, FaTrash, FaCogs, FaPlus } from "react-icons/fa";

// Dummy data
const data = [
  {
    id: 1,
    name: "Course 101",
    instructor: "John Doe",
    students: 25,
    status: "Approved",
  },
  {
    id: 2,
    name: "Course 102",
    instructor: "Jane Smith",
    students: 18,
    status: "Under Review",
  },
  {
    id: 3,
    name: "Course 103",
    instructor: "Peter Pan",
    students: 30,
    status: "Revision Required",
  },
  {
    id: 4,
    name: "Course 104",
    instructor: "Mary Jane",
    students: 22,
    status: "Approved",
  },
  {
    id: 5,
    name: "Course 105",
    instructor: "Luke Skywalker",
    students: 28,
    status: "Under Review",
  },
];

export default function ProviderDashboard() {
  const [filterText, setFilterText] = useState("");

  // Filter data
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.instructor.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleView = (course) => alert(`Viewing course: ${course.name}`);
  const handleManage = (course) => alert(`Manage course: ${course.name}`);
  const handleEdit = (course) => alert(`Edit course: ${course.name}`);
  const handleDelete = (course) => {
    if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
      alert("Deleted!");
    }
  };

  // Columns
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
    { name: "Course Name", selector: (row) => row.name, sortable: true },
    { name: "Instructor", selector: (row) => row.instructor, sortable: true },
    { name: "Students", selector: (row) => row.students, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-info"
            onClick={() => handleView(row)}
          >
            <FaEye style={{ color: "white" }} />
          </button>
          <button
            className="btn btn-sm btn-warning"
            onClick={() => handleManage(row)}
          >
            <FaCogs style={{ color: "white" }} />
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handleEdit(row)}
          >
            <FaEdit style={{ color: "white" }} />
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row)}
          >
            <FaTrash style={{ color: "white" }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ProviderDashboardLayout title="Courses">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-12">
            {/* Header: title left, search + create course right */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Courses List</h5>

              <div className="d-flex gap-2">
                {/* Search box */}
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control w-auto"
                  style={{ minWidth: "200px" }}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />

                {/* Create Course button */}
                <a href="/provider/createCourse">
                  <button className="btn btn-sm btn-success d-flex align-items-center gap-1 createButton">
                    <FaPlus />
                    Create Course
                  </button>
                </a>
              </div>
            </div>

            {/* Data table */}
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              highlightOnHover
              striped
              responsive
            />
          </div>
        </div>
      </div>
    </ProviderDashboardLayout>
  );
}
