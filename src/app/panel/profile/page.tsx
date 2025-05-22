"use client"

import type React from "react"

import { useState } from "react"
import {
  Edit,
  Mail,
  Phone,
  Calendar,
  Award,
  BarChart2,
  Users,
  Briefcase,
  MapPin,
  FileText,
  Plus,
  LogOut
} from "lucide-react"
import styles from "./profile.module.css"
import {useAppDispatch} from "@/src/lib/hooks";
import {SIGN_OUT} from "@/src/lib/reducers";
import {useRouter} from "next/navigation";

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Ибрагим Мусаевич",
    role: "Администратор",
    email: "ibrahim@example.com",
    phone: "+7 (999) 123-45-67",
    registrationDate: "01.01.2023",
    address: "г. Грозный, ул. Ленина, 10",
    position: "Руководитель отдела продаж",
    department: "Отдел продаж",
    bio: "Опытный руководитель с более чем 5-летним стажем работы в сфере продаж и управления клиентами. Специализируюсь на развитии клиентской базы и оптимизации бизнес-процессов.",
  })

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const handleSave = () => {
    setIsEditMode(false)
    // В реальном приложении здесь был бы API-запрос для сохранения данных
  }

  const stats = [
    { label: "Клиентов", value: 42, icon: <Users size={20} />, color: "#4285f4" },
    { label: "Сделок", value: 18, icon: <Briefcase size={20} />, color: "#34a853" },
    { label: "Спонсоров", value: 5, icon: <Award size={20} />, color: "#fbbc05" },
    { label: "Оборот", value: "₽1.2M", icon: <BarChart2 size={20} />, color: "#ea4335" },
  ]

  const activities = [
    { date: "05.05.2024", action: "Добавлен новый клиент: Умалатов Р.Д." },
    { date: "03.05.2024", action: "Оформлена сделка #390 на сумму 129 000 ₽" },
    { date: "01.05.2024", action: "Отправлено 5 уведомлений о платежах" },
    { date: "28.04.2024", action: "Добавлен новый спонсор: Абасов Т.В." },
    { date: "25.04.2024", action: "Создан отчет по сделкам за апрель" },
  ]

  const tasks = [
    { title: "Связаться с клиентом Шарпудиев М.Х.", deadline: "Сегодня", priority: "Высокий" },
    { title: "Подготовить отчет по платежам", deadline: "Завтра", priority: "Средний" },
    { title: "Обновить данные по спонсорам", deadline: "10.05.2024", priority: "Низкий" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Профиль</h1>
        <button
          className={`btn ${isEditMode ? "btn-primary" : ""}`}
          onClick={() => (isEditMode ? handleSave() : setIsEditMode(true))}
        >
          {isEditMode ? (
            "Сохранить"
          ) : (
            <>
              <Edit size={16} /> <span>Редактировать</span>
            </>
          )}
        </button>
      </div>

      <div className={styles.profileGrid}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              <img src="/placeholder.svg?height=100&width=100" alt="Аватар пользователя" />
              {isEditMode && (
                <button className={styles.changeAvatarBtn}>
                  <Edit size={16} />
                </button>
              )}
            </div>
            <div className={styles.profileInfo}>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  className={styles.editInput}
                  value={profileData.name}
                  onChange={handleChange}
                />
              ) : (
                <h2 className={styles.profileName}>{profileData.name}</h2>
              )}
              {isEditMode ? (
                <input
                  type="text"
                  name="role"
                  className={styles.editInput}
                  value={profileData.role}
                  onChange={handleChange}
                />
              ) : (
                <p className={styles.profileRole}>{profileData.role}</p>
              )}
            </div>
            <div>
              <button
                  className={styles.profileSignOutButton}
                  onClick={() => {
                    dispatch(SIGN_OUT())
                    router.push("/login")
                  }}
              >
                Выйти из учетной записи <LogOut color="red" size={16} />
              </button>
            </div>
          </div>

          <div className={styles.profileDetails}>
            <div className={styles.detailGroup}>
              <h3 className={styles.detailTitle}>Личная информация</h3>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  <Mail size={16} /> Email:
                </span>
                {isEditMode ? (
                  <input
                    type="email"
                    name="email"
                    className={styles.editInput}
                    value={profileData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={styles.detailValue}>{profileData.email}</span>
                )}
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  <Phone size={16} /> Телефон:
                </span>
                {isEditMode ? (
                  <input
                    type="tel"
                    name="phone"
                    className={styles.editInput}
                    value={profileData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={styles.detailValue}>{profileData.phone}</span>
                )}
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  <Calendar size={16} /> Дата регистрации:
                </span>
                <span className={styles.detailValue}>{profileData.registrationDate}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  <MapPin size={16} /> Адрес:
                </span>
                {isEditMode ? (
                  <input
                    type="text"
                    name="address"
                    className={styles.editInput}
                    value={profileData.address}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={styles.detailValue}>{profileData.address}</span>
                )}
              </div>
            </div>

            <div className={styles.detailGroup}>
              <h3 className={styles.detailTitle}>Рабочая информация</h3>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  <Briefcase size={16} /> Должность:
                </span>
                {isEditMode ? (
                  <input
                    type="text"
                    name="position"
                    className={styles.editInput}
                    value={profileData.position}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={styles.detailValue}>{profileData.position}</span>
                )}
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>
                  <Users size={16} /> Отдел:
                </span>
                {isEditMode ? (
                  <input
                    type="text"
                    name="department"
                    className={styles.editInput}
                    value={profileData.department}
                    onChange={handleChange}
                  />
                ) : (
                  <span className={styles.detailValue}>{profileData.department}</span>
                )}
              </div>
            </div>

            <div className={styles.detailGroup}>
              <h3 className={styles.detailTitle}>О себе</h3>
              {isEditMode ? (
                <textarea
                  name="bio"
                  className={styles.editTextarea}
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={4}
                ></textarea>
              ) : (
                <p className={styles.bioText}>{profileData.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.statsSection}>
          <h3 className={styles.sectionTitle}>Статистика</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard} style={{ borderColor: stat.color }}>
                <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
                  {stat.icon}
                </div>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.activitiesSection}>
          <h3 className={styles.sectionTitle}>Последние действия</h3>
          <div className={styles.activitiesList}>
            {activities.map((activity, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityDate}>{activity.date}</div>
                <div className={styles.activityContent}>
                  <div className={styles.activityDot}></div>
                  <div className={styles.activityText}>{activity.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tasksSection}>
          <h3 className={styles.sectionTitle}>Задачи</h3>
          <div className={styles.tasksList}>
            {tasks.map((task, index) => (
              <div key={index} className={styles.taskItem}>
                <div className={styles.taskHeader}>
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div
                    className={`${styles.taskPriority} ${
                      task.priority === "Высокий"
                        ? styles.highPriority
                        : task.priority === "Средний"
                          ? styles.mediumPriority
                          : styles.lowPriority
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
                <div className={styles.taskDeadline}>
                  <Calendar size={14} />
                  <span>{task.deadline}</span>
                </div>
              </div>
            ))}
            <button className={styles.addTaskBtn}>
              <Plus size={16} />
              <span>Добавить задачу</span>
            </button>
          </div>
        </div>

        <div className={styles.documentsSection}>
          <h3 className={styles.sectionTitle}>Документы</h3>
          <div className={styles.documentsList}>
            <div className={styles.documentItem}>
              <FileText size={20} />
              <span>Договор о сотрудничестве.pdf</span>
            </div>
            <div className={styles.documentItem}>
              <FileText size={20} />
              <span>Должностная инструкция.docx</span>
            </div>
            <div className={styles.documentItem}>
              <FileText size={20} />
              <span>Отчет за Q1 2024.xlsx</span>
            </div>
            <button className={styles.addDocumentBtn}>
              <Plus size={16} />
              <span>Загрузить документ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
