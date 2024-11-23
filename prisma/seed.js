const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const category = [
  {
    name: "จิตวิทยา",
  },
  {
    name: "นิยาย",
  },
  {
    name: "มังงะ",
  },
  {
    name: "บริหารธุรกิจ",
  },
];

const bookData = [
  {
    title: "จิตวิทยาสายดาร์ก",
    description:
      " Dr. Hiro  เคยเป็นนักขายที่ล้มเหลว  ขายอะไรก็ไม่มีใครซื้อแต่แล้ววันหนึ่งขณะกำลังดูข่าว  เขาก็นึกขึ้นได้ว่า“ในโลกเรามีลัทธิที่ขายของไม่น่าเชื่อถือได้ในราคาแพงลิ่วแถมยังทำให้สาวกยอมทุ่มบริจาคทรัพย์สินจนหมดตัวแล้วทำไมผมถึงขายไม่ออกล่ะ?”เขาจึงเริ่มศึกษาเทคนิคเหล่านั้นอย่างจริงจังอ่านหนังสือทุกเล่มเกี่ยวกับการล้างสมองที่มีในท้องตลาดแล้วเอาไปปรับใช้จนกลายเป็นนักขายระดับท็อปของญี่ปุ่นนั่นคือที่มาของ  “จิตวิทยาสายดาร์ก”พบกับเทคนิคทางจิตวิทยาที่ช่วยให้คุณใช้คำพูดควบคุมจิตใจคนทำให้พวกเขาคล้อยตามและทำอย่างที่คุณต้องการโดยไม่รู้ตัว",
    author: "Dr.Hiro",
    price: 250,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2023-01",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/Cover_%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%94%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%81_1.jpg?v=202405291424",
  },
  {
    title: "ใช้ความคิดเอาชนะโชคชะตา (Mindset)",
    description:
      "ไม่เคยมีหนังสือเล่มไหนอธิบายเกี่ยวกับกรอบคิดนี้ หรือบอกถึงวิธีนำมันไปใช้ประโยชน์ในชีวิต การทำความเข้าใจกรอบคิดดังกล่าวจะช่วยให้คุณเข้าใจบรรดาบุคคลผู้ยิ่งใหญ่ คุณจะเข้าใจคู่ชีวิต เจ้านาย เพื่อนฝูง และลูกๆ นอกจากนี้ คุณยังจะได้รู้วิธีปลดปล่อยศักยภาพของตัวเอง.. รวมถึงของลูกๆ ด้วย นำเรื่องราวของหลายคนมาผสมรวมกันจนกลายเป็นเรื่องเดียว เพื่อให้คุณเข้าใจประเด็นที่ฉันต้องการจะสื่อได้ชัดเจนขึ้น ส่วนบทสนทนาจำนวนหนึ่งก็เกิดจากการเรียบเรียงขึ้นใหม่จากความทรงจำ ซึ่งฉันพยายามแค้นความจำอย่างสุดความสามารถ บทเรียนที่ได้ไปปรับใช้ โดยจะบอกวิธีสังเกตกรอบคิดที่กำลังชี้นำชีวิตคุณเพื่อให้เข้าใจว่ามันทำงานอย่างไร และต้องทำอย่างไรหากคุณอยากเปลี่ยนแปลงมัน",
    author: "Carol S. Dweckn ",
    price: 275,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2018-01",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/202_%E0%B8%9B%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_Mindset.jpg?v=202405291424",
  },
  {
    title: "กินกบตัวนั้นซะ!",
    description:
      "21 วิธีหยุดการผัดวันประกันพรุ่ง และทำงานให้ได้มากขึ้นในเวลาที่น้อยลง หนังสือขายดีระดับโลก ยอดขายทะลุ 1.6 ล้านเล่ม เวลาเจองานยากๆ คุณทำอย่างไร? ถ้าเป็นเหมือนคนส่วนใหญ่ คุณอาจเลี่ยงไปทำงานง่ายๆ ก่อนรอให้พร้อมกว่านี้แล้วค่อยกลับมาทำ น่าเสียดายที่เราไม่เคย “พร้อม” งานยากๆ นั้นจึงคาราคาซัง คอยสูบพลังและทำให้เราเหนื่อยล้าเคร่งเครียดไม่รู้จักจบสิ้น ไบรอัน เทรซี่  เปรียบงานยากๆ ว่าเป็นเหมือน “กบ” ที่หลายคนเบือนหน้าหนี โดยที่ไม่รู้เลยว่าถ้า “กินกบ” ตัวนั้นเข้าไป หน้าที่การงานและชีวิตก็ดีขึ้นอย่างมหาศาล ยิ่งคุณกินกบตัวใหญ่เท่าไหร่ ชีวิตของคุณก็จะยิ่งดีขึ้นเท่านั้น เขาจึงแนะนำวิธีค้นหาและลงมือกินกบตัวที่ใหญ่และสำคัญที่สุด คุณจะได้เรียนรู้ 21 เคล็ดลับการบริหารเวลาที่เรียบง่ายแต่เปี่ยมประสิทธิภาพ ที่จะช่วยให้คุณหยุดการผัดวันประกันพรุ่งและลงมือทำได้ทันที แล้วกบตัวนั้นของคุณคืออะไรล่ะ รีบค้นหามันให้เจอ แล้วกินมันเข้าไปซะ",
    author: "Carol S. Dweckn ",
    price: 160,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2012-02",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/127_%E0%B8%9B%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_Eat_that_frog_3rd.jpg?v=202405291424",
  },
  {
    title:
      "ถอดรหัสลับสมองเงินล้าน (ฉบับปรับปรุง) (Secrets of the Millionaire mind)",
    description:
      "แกะรอยวิธีคิดของคนรวย ว่าเขาหาเงิน เก็บเงิน และใช้เงินอย่างไร ถึงได้มีเงินเหลือเป็นล้าน ในหนังสือเล่มนี้ T. Harv Eker จะช่วยให้คุณรู้จักวิธีการวิเคราะห์ และปรับเปลี่ยนแผนผังทางการเงินในหัวคุณ เพื่อช่วยให้คุณหาเงินและเก็บเงินได้มากขึ้น รวมทั้งใช้จ่ายเงินได้อย่างเหมาะสม ซึ่งวิธีการทั้งหมดนี้ได้ช่วยให้เขาเปลี่ยนจากคนที่เคยถังแตกมาเป็นเศรษฐีร้อยล้านได้ในเวลาแค่ 2 ปีครึ่ง!",
    author: "T. Harv Eker",
    price: 179,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2008-01",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/175_%E0%B8%9B%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_Milionaire_new_edit.jpg?v=202405291424",
  },
  {
    title: "วิชาคนตัวเล็ก (Small Rules)",
    description:
      " พบกับ 33 วิธีคิดที่ช่วยให้คนตัวเล็กๆ สามารถเอาชนะอุปสรรคที่ใหญ่เกินตัว  และเปลี่ยนความเล็กจ้อยของตัวเองให้กลายเป็นข้อได้เปรียบ  บอกเล่าจากประสบการณ์ตรงที่ผ่านการล้ม ลุก และเรียนรู้นับครั้งไม่ถ้วน  ของชายผู้เบื้องหลังสำนักพิมพ์เล็กๆ ที่มียอดขายหนังสือมากกว่า 10 ล้านเล่ม",
    author: "พูนลาภ อุทัยเลิศอรุณ",
    price: 200,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2024-09",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/Cover_Small_Rules_%E0%B8%A7%E0%B8%B4%E0%B8%8A%E0%B8%B2%E0%B8%84%E0%B8%99%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%81_final_1.jpg?v=202405291424",
  },
  {
    title: "ทำไมคุยกับคนนี้แล้วรู้สึกดีจัง",
    description:
      " พูดไม่ต้องเก่งก็สามารถจับใจคนฟังได้ ด้วยเทคนิคลับเฉพาะจากนักจัดรายการวิทยุชื่อดังของญี่ปุ่น “คุยกับคนนี้แล้วรู้สึกดีจัง” คุณอาจสงสัยว่าเป็นเพราะอะไร เพราะอีกฝ่ายคุยเก่งหรือคุยสนุกใช่ไหมคำตอบคือ “ไม่เสมอไป” โยะชิดะ ฮิซะโนะริ นักจัดรายการวิทยุชื่อดังของญี่ปุ่นเคยเป็นคนที่ “บกพร่องด้านการสื่อสาร” เขาจะรู้สึกประหม่าทุกครั้งเวลาเจอคนแปลกหน้า และไม่กล้าแม้แต่สบตาคนที่กำลังคุยด้วย...แต่เมื่อเขาค้นพบ “เทคนิค” บางอย่างและลองนำไปใช้ เขาก็กลายเป็นคนที่บรรดาดาราและคนดัง อยากคุยด้วยมากที่สุด  แม้ว่าเขาจะยังพูดไม่ค่อยเก่งเหมือนเดิมก็ตามตัวอย่างเทคนิคในเล่ม...",
    author: "โยะชิดะ ฮิซะโนะริ",
    price: 170,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2017-01",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/125_%E0%B8%9B%E0%B8%81%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2_%E0%B8%97%E0%B8%B3%E0%B9%84%E0%B8%A1%E0%B8%84%E0%B8%B8%E0%B8%A2%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%99%E0%B8%99%E0%B8%B5%E0%B9%89%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%AA%E0%B8%B6%E0%B8%81%E0%B8%94%E0%B8%B5%E0%B8%88%E0%B8%B1%E0%B8%87.jpg?v=202405291424",
  },
  {
    title: "1 นาทีปาฏิหาริย์หลังตื่นนอน",
    description:
      " 30 กิจวัตรง่าย ๆ ในยามเช้าที่มีพลังเปลี่ยนแปลงชีวิตคุณ/ ไม่จำเป็นต้องทำทั้งหมด  / ไม่จำเป็นต้องทำทุกวัน/ ทำด้วยความรู้สึกแค่ว่า  “พรุ่งนี้เช้าลองทำสิ่งนี้ดีไหมนะ”",
    author: "มัตสึดะ มิฮิโระ",
    price: 220,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2024-05",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/Cover_1_Minute_Miracle_1_%E0%B8%99%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B8%9B%E0%B8%B2%E0%B8%8F%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%B4%E0%B8%A2%E0%B9%8C%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%95%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B8%99%E0%B8%AD%E0%B8%99_final_1.jpg?v=202405291424",
  },
  {
    title: "เมื่อจิตวิทยาทำให้คนรักกัน",
    description:
      "  ค้นพบเหตุผลทางจิตวิทยาว่าทำไมเราถึง  “รัก”  หรือ  “ไม่รัก”พร้อมเทคนิคที่จะช่วยให้พบกับรักที่ดีและรักษาเอาไว้ให้ได้นานที่สุด หลายคนมองว่าความรักเป็นเรื่องลึกลับคาดเดาไม่ได้จึงปล่อยให้เป็นเรื่องของพรหมลิขิตและเฝ้ารอว่าสักวันจะได้พบกับความรักที่ปรารถนาแต่จริง ๆ แล้วมันมีเหตุผลทางจิตวิทยาอยู่เบื้องหลังซึ่งส่งผลต่อชีวิตรักอย่างคาดไม่ถึง  ไม่ว่าจะเป็นการตกหลุมรักการอกหัก  หรือการดึงดูดคนที่ใช่เข้ามาในชีวิต",
    author: "พิชชารัศมิ์",
    price: 200,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2017-04",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%97%E0%B8%B3%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%84%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%81%E0%B8%81%E0%B8%B1%E0%B8%99_final_create_1.jpg?v=202405291424",
  },
  {
    title: "ว่าไงจ๊ะ ความกลัว Hello, Fears",
    description:
      "เพราะความกลัวนี่แหละ ทำให้ฉันมีชีวิตแบบที่ต้องการคู่มือท้าทายและเปิดรับความกลัวให้เข้ามาอยู่ในชีวิตคุณ(แต่อยู่ใต้ฝ่าเท้านะ!)ลองนึกดูเล่น ๆ ว่าคุณกลัวอะไรบ้าง? กลัวผี กลัวสัตว์ กลัวความสูงกลัวคำวิจารณ์ กลัวการถูกปฏิเสธ กลัวความล้มเหลวคำตอบผุดขึ้นมาเต็มหัวคุณเลยใช่ไหม?ที่ผ่านมาคุณก็ได้แต่หนี ไม่กล้าเผชิญหน้ากับมันตรง ๆ ความกลัวเลยยังอยู่เป็นเสี้ยนหนามขัดขวางความก้าวหน้าและความสุขของคุณแต่ถ้าอยากมีชีวิตแบบที่ต้องการ คุณต้องเจอกับมันตัวต่อตัวสักตั้ง ยิ้มให้มัน ทำความรู้จักมัน ควบคุมมันและหาวิธีใช้ประโยชน์จากมันเมื่อนั้น ไม่ว่าคุณปรารถนาสิ่งใดในชีวิตจะไม่มีอะไรมาฉุดรั้งคุณไว้ได้อีกต่อไป",
    author: "Michelle Poler",
    price: 350,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2024-01",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/IMG_9713.jpeg?v=202405291424",
  },
  {
    title: "ถ้าอีก 1 ปีฉันจะต้องตาย",
    description:
      "ความสัมพันธ์  ครอบครัว  ความฝัน  งาน  และเป้าหมายเราควรใช้ชีวิตอย่างไรดี  บทเรียนสำคัญที่จะทำให้คุณใช้เวลาในชีวิตแบบไม่เสียใจในภายหลัง หนังสือขายดียอดขายทะลุ 3 แสนเล่ม ที่ญี่ปุ่น",
    author: "นพ.โอซาวะ ทาเคโทชิ",
    price: 195,
    publisher: "วีเลิร์น (WeLearn)",
    publishDate: "2023-11",
    amount: 20,
    categoryId: 1,
    image:
      "https://image.makewebcdn.com/makeweb/m_1920x0/Z9S9L5BrM/DefaultData/Cover_%E0%B8%96%E0%B9%89%E0%B8%B2%E0%B8%AD%E0%B8%B5%E0%B8%81_1_%E0%B8%9B%E0%B8%B5%E0%B8%89%E0%B8%B1%E0%B8%99%E0%B8%88%E0%B8%B0%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%95%E0%B8%B2%E0%B8%A2_final_create_14_3_16_cm_1.jpg?v=202405291424",
  },
  {
    title: "ฆาตกรมนุษย์กบกับศพปริศนา ถึงเวลาออกฆ่าอีกครั้ง",
    description:
      "สิบเดือนหลังจากฆาตกรมนุษย์กบลงมือครั้งสุดท้ายคดีฆาตกรรมครั้งใหม่ก็เกิดขึ้น…บ้านที่ลุกไหม้และชิ้นส่วนมนุษย์ซึ่งกระจัดกระจายแหลกเละจากแรงระเบิดมีกระดาษเขียนด้วยลายมือเหมือนเด็กทิ้งไว้วันนี้เล่นประทัดแหละเสียงดังลั่นเลย ทุกอย่างเปรี้ยงปร้างไปหมด สุดยอดไปเลย แล้วก็ลองเอาไปจุดในตัวกบดูแหละ กบระเบิดเหมือนดอกไม้ไฟเลยมีตากบติดอยู่ที่เสื้อของฉันด้วยแหละฝันร้ายอันน่าสยดสยองกลับมาเยือนชาวเมืองอีกครั้งวาตาเซะและโคเตงาวะจึงต้องร่วมมือกันยับยั้งคดีฆาตกรรมสุดสะเทือนขวัญและลากคอบุรุษกบมาลงโทษให้ได้!",
    author: "ชิจิริ นากายามะ",
    price: 395,
    publisher: "Prism",
    publishDate: "2024-09",
    amount: 20,
    categoryId: 2,
    image:
      "https://static.wixstatic.com/media/936e61_9b626a3c2c98460ba0a4ac6f4b6ea971~mv2.jpg/v1/fill/w_258,h_375,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/936e61_9b626a3c2c98460ba0a4ac6f4b6ea971~mv2.jpg",
  },
  {
    title: "โกสต์ทาวน์",
    description:
      "เฉินเทียนหง ลูกคนสุดท้องของตระกูลเฉิน พ่อแม่ของเขามีลูกสาวติดกันถึง 5 คน จนลูก 2 คนสุดท้ายจึงได้ลูกชายสมใจ แต่เขากลับไม่เป็นที่น่าภูมิใจของพ่อแม่ เขาดั้นด้นหนีไปไกลถึงเยอรมนี คิดจะตัดขาดจากครอบครัว แต่สุดท้ายก็ต้องกลับมายังหมู่บ้านผีสิงแห่งนี้",
    author: "เฉินซือหง",
    price: 425,
    publisher: "Page Publishing",
    publishDate: "2024-09",
    amount: 20,
    categoryId: 2,
    image:
      "https://static.wixstatic.com/media/936e61_ca49ed62c0dc4abdad80505d333fa89e~mv2.jpg/v1/fill/w_288,h_375,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/936e61_ca49ed62c0dc4abdad80505d333fa89e~mv2.jpg",
  },
  {
    title: "คาโมงาวะ นักสืบอาหารรสชาติความทรงจำ",
    description:
      "สำหรับใครบางคน การกินอาหารอาจไม่ใช่แค่อร่อยและอิ่มท้อง เพราะสิ่งที่ซ่อนอยู่ในแต่ละจานอาจมีความหมายกับใครบางคนมากกว่านั้น ณ ร้านอาหารคาโมงาวะที่ตั้งอยู่ในเกียวโต เจ้าของร้านคือ คาโมงาวะ นางาเระ อดีตเจ้าหน้าที่ตำรวจ กับคาโมงาวะ โคอิชิ ผู้เป็นลูกสาว และมีเจ้าแมวฮิรุเนะ คอยคลอเคลียส่งลูกค้าอยู่นอกร้าน ทว่าลูกค้าบางคนที่มาร้านนี้กลับไม่ได้มากินอาหารเป็นจุดประสงค์หลัก เพราะที่นี่ยังเปิดเป็นสำนักงานนักสืบคาโมงาวะ รับสืบหารสชาติอาหารในความทรงจำ เพื่อทำเมนูนั้นให้ลูกค้าได้ลิ้มรสอีกครั้งจากเบาะแสอันน้อยนิดในความทรงจำเลือนรางของลูกค้า จะทำให้สองพ่อลูกคาโมงาวะสืบหาเมนูนั้นได้สำเร็จหรือไม่ นวนิยาย Cozy Mystery สำหรับคนที่จริงจังกับอาหารและมีรสชาติที่ยังคิดถึง หนังสือสุดฮิตที่ดัดแปลงเป็นซีรีส์ญี่ปุ่นและแปลเป็นภาษาอังกฤษในชื่อ The Kamogawa Food Detectives",
    author: "คาชิวาอิ ฮิซาชิ",
    price: 289,
    publisher: "Bibli",
    publishDate: "2024-10",
    amount: 20,
    categoryId: 2,
    image:
      "https://static.wixstatic.com/media/936e61_6c4037b38eae4e8eb3e0a31332ad601b~mv2.png/v1/fill/w_255,h_375,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/936e61_6c4037b38eae4e8eb3e0a31332ad601b~mv2.png",
  },
  {
    title: "YOU GHOST ME EVERY SADTURDAY NIGHT",
    description:
      "รวมเรื่องสั้น 15 เรื่อง อ่านไวๆ ในหนึ่งคืน ว่าด้วยความสัมพันธ์ที่อยู่ดีๆ ก็จางหาย ไม่ร่ำลา ระหว่างผู้คน ผี และสิ่งศักดิ์สิทธิ์ ตั้งแต่เรื่องของท่านเจ้าป่าผู้บินตามไปเอาหินก้อนหนึ่งกลับมาจากชายต่างชาติมือซน บทสนทนาของคุณหมออายุรกรรมกับพ่อใหญ่จากศาลพระภูมิ นักจิตบำบัดกับแม่ย่านางรถฟอร์จูนเนอร์ ชายหนุ่มผู้สร้างสตอรี่เพื่อขายทะเบียนรถ 777 เพราะเป็นเลขไม่มงคล วิญญาณคู่รักที่สัญญาว่าจะตามติดไปทุกภพชาติ หญิงสาวที่โดนขัดจังหวะเฉิดฉายเปล่งแสงเพราะการปล่อยปลา และอีกหลายเรื่องราวเซอร์เรียลที่ ‘ธนชาติ ศิริภัทราชัย’ เก็บเล็กผสมน้อยจากข่าวและเรื่องราวที่ได้อ่านในแต่ละวัน",
    author: "ธนชาติ ศิริภัทราชัย",
    price: 270,
    publisher: "Salmon",
    publishDate: "2024-03",
    amount: 20,
    categoryId: 2,
    image:
      "https://static.wixstatic.com/media/936e61_02442a249fea4b71a4993cddd6622599~mv2.jpg/v1/fill/w_219,h_375,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/936e61_02442a249fea4b71a4993cddd6622599~mv2.jpg",
  },
  {
    title: "เมนูแห่งความหวัง ณ ร้านริมฝั่งทะเล",
    description:
      "ทุกคนล้วนมีที่มาที่ไป เรื่องราวของร้านอาหารเล็ก ๆ ริมทะเลอุมิกะที่จู่ ๆ ก็ถูกบังคับให้ต้องเปิดร้านอาหารเล็ก ๆ แห่งนี้แทนแม่ที่หายตัวไป แม้จะพยายามอย่างเต็มที่แต่ร้านก็ยังเงียบเหงา วันหนึ่งเธอได้เจอกับเด็กคนหนึ่งโดยบังเอิญ และแล้วเรื่องราวการเกิดใหม่อีกครั้งของผู้คนมากมายที่พูดว่า “ไม่รู้จะดำรงชีวิตต่อไปอย่างไร” เหมือนวัตถุดิบทำอาหารที่มีตำหนิจึงก่อกำเนิดขึ้น ณ ที่แห่งนี้ “ครัวลมทะเล”",
    author: "ทากาชิ คิตาจิมะ",
    price: 295,
    publisher: "Piccolo",
    publishDate: "2024-09",
    amount: 20,
    categoryId: 2,
    image:
      "https://static.wixstatic.com/media/936e61_73b5890ec97f45a88958e99195eac735~mv2.jpg/v1/fill/w_250,h_375,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/936e61_73b5890ec97f45a88958e99195eac735~mv2.jpg",
  },
  {
    title: "SPY x FAMILY เล่ม 1",
    description:
      "โฮมคอเมดี้สุดฮาของครอบครัวปลอมๆ ที่ต่างฝ่ายต่างปกปิดตัวจริงของกันและกัน ที่ต้องเผชิญหน้ากับการสอบเข้าและปกป้องโลก",
    author: "Endou Tatsuya",
    price: 80,
    publisher: "สยามอินเตอร์คอมิกส์/Siam Inter Comics",
    publishDate: "2019-01",
    amount: 20,
    categoryId: 3,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202001/498858/1000230245_front_XXXL.jpg?imgname=SPY-x-FAMILY-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-1",
  },
  {
    title: "SPY x FAMILY เล่ม 2",
    description:
      "เพื่อเข้าใกล้เป้าหมายเดสมอนด์ อาเนียจะต้องเป็นนักเรียนดีเด่นให้ได้!! สนธยาจึงเริ่มปฏิบัติการ แผนตีสนิทชิดเชื้อ...!?",
    author: "Endou Tatsuya",
    price: 80,
    publisher: "สยามอินเตอร์คอมิกส์/Siam Inter Comics",
    publishDate: "2019-08",
    amount: 20,
    categoryId: 3,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202003/501322/1000231464_front_XXXL.jpg?imgname=SPY-x-FAMILY-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-2",
  },
  {
    title: "SPY x FAMILY เล่ม 3",
    description:
      "ยูริผู้รักและเทิดทูนพี่สาว ก็ได้บอกให้สนธยาพิสูจน์ว่าทั้งสองเป็นคู่รักกันจริงๆ",
    author: "Endou Tatsuya",
    price: 80,
    publisher: "สยามอินเตอร์คอมิกส์/Siam Inter Comics",
    publishDate: "2020-01",
    amount: 20,
    categoryId: 3,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202003/502381/1000232114_front_XXXL.jpg?imgname=SPY-x-FAMILY-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-3",
  },
  {
    title: "SPY x FAMILY เล่ม 4",
    description:
      "ผู้ก่อการร้ายคิดจะใช้หมาติดระเบิดลอบสังหารรัฐมนตรีของเวสทาลิส!",
    author: "Endou Tatsuya",
    price: 85,
    publisher: "สยามอินเตอร์คอมิกส์/Siam Inter Comics",
    publishDate: "2020-08",
    amount: 20,
    categoryId: 3,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202008/509674/1000234365_front_XXXL.jpg?imgname=SPY-x-FAMILY-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-4",
  },
  {
    title: "SPY x FAMILY เล่ม 5",
    description: "การสอบที่มีสเตล่าและโทนิโท่เป็นเดิมพันจะออกมาเป็นเช่นไร...!!",
    author: "Endou Tatsuya",
    price: 85,
    publisher: "สยามอินเตอร์คอมิกส์/Siam Inter Comics",
    publishDate: "2020-08",
    amount: 20,
    categoryId: 3,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202012/517500/1000238032_front_XXXL.jpg?imgname=SPY-x-FAMILY-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%A1-5",
  },
  {
    title: "พ่อรวยสอนลูก ฉบับครบรอบ 25 ปี",
    description:
      "พ่อรวยสอนลูก ความคลาสสิกที่ยืนหยัดเหนือกาลเวลา หนังสือการเงินส่วนบุคคลอันดับ #1 ตลอดกาล การศึกษาหาความรู้จากหนังสือเป็นอีกหนึ่งปรัชญาของพ่อรวย เพื่อให้คุณอ่าน ถก และอภิปราย จากนั้นลองทำ แล้วมาพูดคุยแลกเปลี่ยนประสบการณ์กันอีกครั้ง พ่อรวยสอนลูก ฉบับครบรอบ 25 ปี มีการเพิ่ม 9 บทเรียน สำหรับแลกเปลี่ยนเรียนรู้ เพื่อให้คุณใช้เป็นแนวทางในการอ่าน อ่านซ้ำและพูดคุยแลกเปลี่ยนเพื่อศึกษาความรู้ทางการเงินกับเพื่อน เพื่อนร่วมงาน และครอบครัว",
    author: "Robert T. Kiyosaki (โรเบิร์ต คิโยซากิ)",
    price: 345,
    publisher: "ซีเอ็ดยูเคชั่น/se-ed",
    publishDate: "2024-03",
    amount: 20,
    categoryId: 4,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202408/619576/1000274485_front_XXXL.jpg?imgname=%E0%B8%9E%E0%B9%88%E0%B8%AD%E0%B8%A3%E0%B8%A7%E0%B8%A2%E0%B8%AA%E0%B8%AD%E0%B8%99%E0%B8%A5%E0%B8%B9%E0%B8%81-%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%9A%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%9A-25-%E0%B8%9B%E0%B8%B5",
  },
  {
    title: "พ่อรวยสอนลูก # 2 : เงินสี่ด้าน",
    description:
      "เนื้อหาของหนังสือเล่มนี้กล่าวถึงความแตกต่างในเรื่องการทำงาน การหารายได้ และการบริหารเงินของคนในสี่ลักษณะอาชีพ ได้แก่ ลูกจ้าง คนทำธุรกิจส่วนตัว เจ้าของกิจการ และนักลงทุน โดยเปรียบเทียบให้เห็นถึงเหตุผลที่ทำให้คนสี่กลุ่มนี้มีสถานะทางการงานและการเงินที่ต่างกัน พร้อมคำแนะนำและข้อชี้แนะว่าต้องทำอย่างไรจึงจะมีอิสระภาพทางการเงิน!",
    author: "Robert T. Kiyosaki (โรเบิร์ต คิโยซากิ)",
    price: 320,
    publisher: "ซีเอ็ดยูเคชั่น/se-ed",
    publishDate: "2013-06",
    amount: 20,
    categoryId: 4,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202212/567781/6000069066_front_XXXL.jpg?imgname=%E0%B8%9E%E0%B9%88%E0%B8%AD%E0%B8%A3%E0%B8%A7%E0%B8%A2%E0%B8%AA%E0%B8%AD%E0%B8%99%E0%B8%A5%E0%B8%B9%E0%B8%81---2-:-%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99",
  },
  {
    title: "พ่อรวยสอนลงทุน : Rich Dad's Guide to Investing",
    description:
      "หนังสือเล่มนี้จะบอกถึงกระบวนการในการพัฒนาตัวเองเพื่อให้คุณเป็นนักลงทุนที่ดีขึ้น เก่งขึ้น และทนต่อสภาวะความเสี่ยง และความเปลี่ยนแปลงในโลกการลงทุน ที่นับวันมีแต่จะดุเดือดได้ดียิ่งขึ้น ที่สำคัญที่สุด มันยังช่วยย้ำให้ได้เห็นความสำคัญของเป้าหมายและแผนการลงทุน ซึ่งเป็นสิ่งที่จำเป็นต่อการลงทุนอย่างยิ่งยวด อีกทั้งจะเปลี่ยนมุมมองในเรื่องการลงทุนของคุณไปตลอดกาล!",
    author: "Robert T. Kiyosaki (โรเบิร์ต คิโยซากิ)",
    price: 385,
    publisher: "ซีเอ็ดยูเคชั่น/se-ed",
    publishDate: "2002-04",
    amount: 20,
    categoryId: 4,
    image:
      "https://storage.naiin.com/system/application/bookstore/resource/product/202212/567781/6000069066_front_XXXL.jpg?imgname=%E0%B8%9E%E0%B9%88%E0%B8%AD%E0%B8%A3%E0%B8%A7%E0%B8%A2%E0%B8%AA%E0%B8%AD%E0%B8%99%E0%B8%A5%E0%B8%B9%E0%B8%81---2-:-%E0%B9%80%E0%B8%87%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B9%89%E0%B8%B2%E0%B8%99",
  },
];

console.log("DB seed...");

async function run() {
  await prisma.category.createMany({
    data: category,
  });

  await prisma.product.createMany({
    data: bookData,
  });
}

run();
