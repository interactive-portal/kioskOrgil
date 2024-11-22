import React, { useState, useTransition } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

type PropsType = {
  data?: any;
  options?: any;
};

const Terms: FC<PropsType> = ({ data, options }) => {
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="mt-2 shadow-lg  p-4 bg-white rounded-2xl h-[450px] overflow-auto transition-max-height duration-300 ease-in-out scrollbar-thumb-gray-300  scrollbar-track-gray-200 scrollbar-thin hover:scrollbar-thumb-gray-300 -dark scrollbar-thumb-rounded-full">
          <div className="flex flex-col text-base ">
            <div className="flex flex-col gap-2">
              <p>
                &nbsp; &nbsp; &nbsp; &nbsp; Хэрэглэгч нь BB ХХК” /цаашид
                <b> “Үйлчилгээ үзүүлэгч”</b> гэх/-ийн хэрэглэгчдээ үзүүлэх kiosk
                /цаашид “Систем” гэх/ үйлчилгээг авахдаа дор дурдсан
                нөхцөлүүдийг бүрэн ойлгож, хүлээн зөвшөөрсөн болно. Энэ нь цахим
                үйлчилгээний нөхцөл/Цаашид <b>“Үйлчилгээний нөхцөл”</b> гэх
                /-ийг бүрэн ойлгож, хүлээн зөвшөөрсөн, холбогдох гэрээг бичгээр
                байгуулсантай адилаар тооцогдоно.
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <span className="text-[#000] leading-[26px] md:leading-4 font-bold text-[16px] cloud-list text-center mt-4">
                НЭГ. СИСТЕМД НЭВТРЭХ
              </span>
              <ul className="list-outside pl-2 ">
                <li className=" flex gap-4">
                  <span> 1.1.</span>
                  <p>
                    Системийн хэвийн үйл ажиллагаа алдагдвал модуль, тайлан
                    мэдээ, цонх зэрэг бүхий л талбарт гарсан алдааг нийлүүлэгч
                    талаар түргэн шуурхай асуудлыг шийдвэрлүүлэх эрхтэй.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 1.2.</span>
                  <p>
                    Системд ашиглагдах хэрэглэгчийн нууц үг, цахим шууданд
                    илгээдэг нэвтрэх холбоос, нууц үг солих холбоосны аюулгүй
                    байдлыг хэрэглэгч хариуцна.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 1.3.</span>
                  <p>
                    Системийн хэрэглэгчийн нэвтрэх нэр, нууц үгийг бусдад хууль
                    бус зорилгоор дамжуулах, ашиглуулахыг хориглоно.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 1.4.</span>
                  <p>
                    Үйлчлүүлэгч нь системд нэвтрэх нэр, нууц үгээ бусдад алдсан,
                    шилжүүлсэн эсхүл зөвшөөрөлгүй таны хувийн мэдээлэлд хандсан
                    нөхцөл байдал үүссэн гэж үзвэл энэ тухай яаралтай Үйлчилгээ
                    үзүүлэгчид мэдэгдэж, хэрэглэгч нууц үгээ солих үүрэгтэй.
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 ">
              <span className="text-[#000] leading-[26px] md:leading-4 font-bold text-[16px] cloud-list text-center mt-4">
                ХОЁР. ХЭРЭГЛЭГЧИЙН ЭРХ, ҮҮРЭГ
              </span>
              <ul className="list-outside pl-2 ">
                <li className=" flex gap-4">
                  <span> 2.1.</span>
                  <p>
                    Хэрэглэгч нь систем ашиглах компьютер, сүлжээ, техник
                    хангамжийг бэлтгэсэн байна.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 2.2.</span>
                  <p>
                    Системийн хэвийн үйл ажиллагаа алдагдсан тохиолдол буюу
                    модуль, тайлан мэдээ, цонх зэрэг бүхий л талбарт гарсан
                    алдааг Үйлчилгээ үзүүлэгчид мэдэгдэн түргэн шуурхай асуудлыг
                    шийдвэрлүүлэх эрхтэй.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 2.3.</span>
                  <p>
                    Эрх бүхий хэрэглэгчдийн нууц үг болон системийн аюулгүй
                    байдалтай холбоотой дүрэм журмыг чанд мөрдөж, нууц үгээ
                    алдахгүй байх, тогтсон хугацаанд нууц үгээ өөрчилдөг байх
                    зэрэг шаардлагыг хангаж ажиллана.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 2.4.</span>
                  <p>
                    Хэрэглэгч нь системийг хэрэглэхдээ интернэт холболтыг
                    асуудалгүй ажиллагааг хангаж ажиллах үүрэгтэй ба тус үүргээ
                    биелүүлээгүйгээс үүссэн аливаа асуудлыг Үйлчилгээ үзүүлэгч
                    хариуцахгүй болно.
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 ">
              <span className="text-[#000] leading-[26px] md:leading-4 font-bold text-[16px] cloud-list text-center mt-4">
                ГУРАВ. ҮЙЛЧИЛГЭЭ ҮЗҮҮЛЭГЧИЙН ЭРХ ҮҮРЭГ
              </span>
              <ul className="list-outside pl-2 ">
                <li className=" flex gap-4">
                  <span> 3.1.</span>
                  <p>
                    Хэрэглэгч талд системийг ашиглах хэрэглэгчийн эрхийн
                    тохиргоо, нэвтрэх хэрэглэгчийн нэр нууц үгийг үүсгэж өгнө.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 3.2.</span>
                  <p>
                    Аливаа өөрчлөлт сайжруулалтыг системийн видео хичээл, гарын
                    авлагат тусган хэрэглэгчид help.ddd.com хаягаар хүргэх
                    үүрэгтэй.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 3.3.</span>
                  <p>
                    Системийн хэвийн үйл ажиллагаатай холбоотой хүсэлт, санал,
                    гомдлыг даваа-баасан гаригт 09:00-18:00 цагийн хооронд
                    0000000 дугаарын утсаар хүлээн авч түргэн шуурхай шийдвэрлэх
                    үүрэгтэй.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 3.4.</span>
                  <p>
                    Хэрэглэгч системийн ашиглалтын төлбөрийг төлөөгүй нөхцөлд
                    системийн ажиллагааг түр хугацаагаар түдгэлзүүлэх эрхтэй.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 3.5.</span>
                  <p>
                    Тодорхой бус шалтгааны улмаас системд саатал гарч үйл
                    ажиллагаа доголдсон тохиолдолд хоёр тал хамтран ажлын 3
                    хоногийн дотор шалтгааныг тодруулж яаралтай шийдвэрлэнэ.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 3.6.</span>
                  <p>Системийг зогсолтгүй, найдвартай ажиллуулах үүрэгтэй.</p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 ">
              <span className="text-[#000] leading-[26px] md:leading-4 font-bold text-[16px] cloud-list text-center mt-4">
                ДӨРӨВ. ҮЙЛЧИЛГЭЭНИЙ ТӨЛБӨР, ТООЦОО
              </span>
              <ul className="list-outside pl-2 ">
                <li className=" flex gap-4">
                  <span> 4.1.</span>
                  <p>
                    Системийн ашиглалт үйлчилгээний хөлсийг төлөх олон боломжийг
                    хэрэглэгчид санал болгох ба тухайн төлбөр тооцооны хэлбэрээс
                    хамаарч гүйлгээний шимтгэл харилцан адилгүй байна.
                  </p>
                </li>
                <li className=" flex gap-4">
                  <span> 4.2.</span>
                  <p>
                    Төлбөрийн нэхэмжлэхийг системээр илгээснээс хойш ажлын 1
                    хоногт төлбөрийг 100% төлнө.
                  </p>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 ">
              <span className="text-[#000] leading-[26px] md:leading-4 font-bold text-[16px] cloud-list text-center mt-4">
                ТАВ. МЭДЭЭЛЛИЙН НУУЦЛАЛ
              </span>
              <ul className="list-outside pl-2 ">
                <li className=" flex gap-4">
                  <span> 5.1.</span>
                  <p>
                    Байгууллагын нууцын тухай хуулийн дагуу нууцад хамаарах
                    мэдээ, материалын талаар ямар нэгэн хэлбэрээр гадагш
                    задруулахгүй байх үүргийг талууд хугацаагүйгээр хүлээнэ.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
