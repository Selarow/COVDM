import random
import json

random.seed(1012021)

class Patient :
    #-------------CONST--------------------
    COVID_START = "01/01/2021"
    
    #-------------VAR----------------------
    #---Patient info---
    patient_id = int
    vaccinated = bool
    sick = bool
    dead = bool
    facility = int
    date_vaccination = str
    age = int
    
    def __init__(self,id,vaccin,malade,mort,location,date,age) :
        self.patient_id = id
        self.vaccinated = vaccin
        self.facility = location
        self.date_vaccination = date
        self.age = age
        self.sick = malade
        self.dead = mort
        
        if self.age <= 40 :
            self.vaccinated = False
        if not self.vaccinated :
            self.date_vaccination = None
        if self.dead :
            self.vaccinated = False
            self.sick = False
        
    def __str__(self):
        v = str
        if self.vaccinated : v = " a été vacciné au " + str(self.facility) +" le "+ self.date_vaccination
        else : v = " n'a pas été vacciné au " + str(self.facility)
        
        if self.dead : return "Le patient d'ID "+str(self.patient_id)+" agé de "+str(self.age)+" an(s) "+str(self.facility)+" est mort"
        else :
            patient = "Le patient d'ID "+str(self.patient_id)+" agé de "+str(self.age)+" an(s)"+v
        return patient
    
    def convert_query(self) :
        query_vaccin = 0
        query_sick = 0
        query_dead = 0
        vaccine_date = "NULL"
        if self.vaccinated : 
            query_vaccin = 1 
            vaccine_date = f"'{self.date_vaccination}'"
        if self.sick : query_sick = 1
        if self.dead : query_dead = 1
        query = f"({self.patient_id},{query_vaccin},{query_sick},{query_dead},{self.facility},{vaccine_date},{self.age})"
        return query
    
    def convert_json(self) :
        return [self.vaccinated,self.sick,self.dead,self.facility,self.date_vaccination,self.age]
        
class DataBase :
    #---CONST---
    YEAR = 2021
    
    #---DataBase---
    db = dict()
    
    def __init__(self,max_gen) :
        i = 0
        dic = dict()
        def date_generation() :
            flag = False
            while not flag :
                j = random.randint(1,31)
                m = random.randint(1,12)
                a = random.choice([2020,2021])
                flag = True
                if (j == 31) and m%2==0 :
                    flag = False
                if (a == 2021) and m>4 :
                    flag = False
                if (a == 2020) and m<9 :
                    flag = False
            return j,m,a

        while i!= max_gen :
            i+=1
            #---probability---
            prob = random.randint(1,3)
            
            #---All randoms var---
            v = random.choice([True,False])
            s = random.choice([True,False])
            de_prob = [False for i in range(19)]
            de_prob.append(True)
            de = random.choice(de_prob)
            #print("dead",d)
            l = random.randint(1,3277)
            ag = int
            if prob == 2 : ag = random.randint(18,70)
            else : ag = random.randint(70,90)
            j,m,a = date_generation()
            d = str(j)+"/"+str(m)+"/"+str(a)
                        
            #---patient creation---
            p = Patient(i,v,s,de,l,d,ag)
            dic[i] = p
        self.db = dic #add on db
        
    def convert_query(self) :
        file = open("docs/query.txt","w")
        #------------DB Head---------------
        #--------all the code below respect the syntax and types of sqlite documentation-----
        """ file.write("CREATE DATABASE covdm;\n")
        file.write("CREATE TABLE covdm_(\n")
        file.write("id INTEGER PRIMARY KEY,\n is_vaccinated INTEGER,\n facility INTEGER,\n vaccination_date TEXT,\n age INTEGER\n")
        file.write(");\n") """
        
        #----------DB Insertion------------
        file.write("INSERT INTO covdm_user(id,is_vaccinated,sick,dead,facility,vaccination_date,age) VALUES\n")
        for i in range(1,len(self.db)) :
            file.write(self.db[i].convert_query())
            if i != len(self.db)-1 : file.write(",\n")
            else : file.write(";\n")
            
        file.close()
    
    def to_json(self) :
        dic = dict()
        for k in self.db :
            intel = self.db[k].convert_json()
            dic[k] = intel
            
        with open('docs/patients.json', 'w') as f:
            json.dump(dic,f)
        return dic
    
    
    
db_patient = DataBase(100000)
db_patient.convert_query()

