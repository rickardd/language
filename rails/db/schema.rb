# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161001192340) do

  create_table "conjugations", force: :cascade do |t|
    t.string   "person"
    t.string   "spanish_pron"
    t.string   "spanish"
    t.string   "english"
    t.boolean  "is_regular"
    t.integer  "verb_id"
    t.string   "section"
    t.string   "helper_verb"
    t.string   "tens"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "conjugations_lists", force: :cascade do |t|
    t.integer "list_id",        null: false
    t.integer "conjugation_id", null: false
    t.index ["conjugation_id"], name: "index_conjugations_lists_on_conjugation_id"
    t.index ["list_id"], name: "index_conjugations_lists_on_list_id"
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name",       default: "private"
    t.integer  "user_id"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "lists_translations", force: :cascade do |t|
    t.integer "list_id",        null: false
    t.integer "translation_id"
    t.index ["list_id"], name: "index_lists_translations_on_list_id"
    t.index ["translation_id"], name: "index_lists_translations_on_translation_id"
  end

  create_table "lists_verbs", force: :cascade do |t|
    t.integer "list_id"
    t.integer "verb_id"
  end

  create_table "scores", force: :cascade do |t|
    t.integer  "bucket",          default: 0
    t.integer  "step",            default: 0
    t.integer  "no_of_succeeded", default: 0
    t.integer  "no_of_failed",    default: 0
    t.integer  "no_of_attempts",  default: 0
    t.integer  "translation_id"
    t.integer  "user_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "verb_id"
    t.integer  "conjugation_id"
    t.index ["translation_id"], name: "index_scores_on_translation_id"
    t.index ["user_id"], name: "index_scores_on_user_id"
  end

  create_table "translations", force: :cascade do |t|
    t.string   "spanish"
    t.string   "english"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "user_id",    default: -1
    t.string   "category"
    t.string   "context"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "verbs", force: :cascade do |t|
    t.string   "infinitve_english"
    t.string   "infinitve_spanish"
    t.string   "past_participle_spanish"
    t.string   "past_participle_english"
    t.string   "gerund_spanish"
    t.string   "gerund_english"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

end
