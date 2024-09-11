import { Modal } from "antd";
import { FC, useState } from "react";
import BasketList from "./basketList";
import useSWR from "swr";
import _ from "lodash";
import PaymentModal from "../plan/paymentModal";

type PropsType = {
  open?: any;
  setOpen?: any;
};

const Basket: FC<PropsType> = ({ open, setOpen }) => {
  let {
    data: list,
    error,
    mutate,
  } = useSWR(`
	/api/get-data?metaid=17122065847289
	`);

  const [product, setProduct] = useState<any>();
  const [openPayment, setOpenPayment] = useState(false);

  if (_.isEmpty(list?.result)) {
    return;
  }

  return (
    <>
      <Modal
        open={open}
        title="АЛЧУУР & ХАЛАТ"
        width={500}
        onCancel={() => setOpen(false)}
        footer={false}
        destroyOnClose
        afterOpenChange={() => setOpenPayment(false)}
      >
        {openPayment ? (
          <PaymentModal
            item={{
              ...list?.result?.[0],
              saleprice:
                list?.result?.[0]?.saleprice * product ||
                list?.result?.[0]?.saleprice,
            }}
            setSelectDateModal={setOpenPayment}
          />
        ) : (
          <div className="mt-6 px-[10px]">
            <div className="border border-[#00B0AB] p-6 rounded-[15px]">
              {list?.result?.map((obj: any, ind: number) => {
                return (
                  <BasketList key={ind} setProduct={setProduct} obj={obj} />
                );
              })}
            </div>
            <div className="mx-10 flex items-center justify-between text-[20px] gap-x-4 my-10">
              <button
                className="w-full text-[#C4C4C4] uppercase bg-[#272A32] rounded-[8px]"
                onClick={() => setOpen(false)}
              >
                болих
              </button>
              <button
                className="w-full bg-[#BAD405] text-black uppercase rounded-[8px]"
                onClick={() => setOpenPayment(true)}
              >
                төлбөр төлөх
              </button>
            </div>
          </div>
        )}

        <style>
          {`
				.ant-modal-content {
				background-color:#202020 !important;
				}
				.ant-modal-title {
					background-color:#202020 !important;
					color:#BAD405 !important;
					font-size:28px !important;
				}
        :where(.css-dev-only-do-not-override-2q8sxy).ant-statistic .ant-statistic-title {
          color:white
        }
        :where(.css-dev-only-do-not-override-2q8sxy).ant-statistic .ant-statistic-content {
          color:white
        }
				`}
        </style>
      </Modal>
      {/* <Modal
        open={openPayment}
        footer={false}
        onCancel={() => setOpenPayment(false)}
        title={false}
        width={634}
      >

      </Modal> */}
    </>
  );
};

export default Basket;
