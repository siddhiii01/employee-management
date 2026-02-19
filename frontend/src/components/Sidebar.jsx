import employeeIcon from '../Assets/employee.svg'
import leavesIcon from '../Assets/leaves.svg'
import holidaysIcon from '../Assets/holidays.svg'
import outdoorIcon from '../Assets/outdoor_duty.svg'
import expenseIcon from '../Assets/expense.svg'
import attendanceIcon from '../Assets/attendance.svg'
import itIcon from '../Assets/it_computation.svg'
import salaryIcon from '../Assets/salary.svg'
import documentsIcon from '../Assets/documents.svg'
import trainingIcon from '../Assets/training.svg'
import performanceIcon from '../Assets/performance.svg'
import policiesIcon from '../Assets/policies.svg'
import reportsIcon from '../Assets/reports.svg'
import supportIcon from '../Assets/support.svg'
import './Sidebar.css'

const menuItems = [
  { label: 'Employee',        icon: employeeIcon },
  { label: 'Leaves',          icon: leavesIcon },
  { label: 'Holidays',        icon: holidaysIcon },
  { label: 'Outdoor Duty',    icon: outdoorIcon },
  { label: 'Expense',         icon: expenseIcon },
  { label: 'Attendance',      icon: attendanceIcon },
  { label: 'IT Computation',  icon: itIcon },
  { label: 'Salary',          icon: salaryIcon },
  { label: 'Documents',       icon: documentsIcon },
  { label: 'Training & Dev.', icon: trainingIcon },
  { label: 'Performance',     icon: performanceIcon },
  { label: 'HR Policies',     icon: policiesIcon },
  { label: 'Reports',         icon: reportsIcon },
  { label: 'Support',         icon: supportIcon },
]

export default function Sidebar() {
  return (
    <div className="sidebar">
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`sidebar-item ${item.label === 'Employee' ? 'active' : ''}`}
        >
          <img src={item.icon} alt={item.label} className="sidebar-icon" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}