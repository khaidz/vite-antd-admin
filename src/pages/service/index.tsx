import { BasicButton } from "@/components/basic-button"
import BasicTitle from "@/components/basic-title"

function Service(props) {
  return (
    <section>
      <BasicTitle>Chi tiết yêu cầu dịch vụ</BasicTitle>
      <div className="flex gap-3">
        <BasicButton buttonType="default" size="large">
          default
        </BasicButton>
        <BasicButton buttonType="primary" size="large">
          primary
        </BasicButton>
        <BasicButton buttonType="secondary" size="large">
          secondary
        </BasicButton>
        <BasicButton buttonType="warning" size="large">
          warning
        </BasicButton>
      </div>
    </section>
  )
}

export default Service
