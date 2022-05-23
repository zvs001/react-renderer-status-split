import _ from 'lodash'
import { ReactElement } from 'react'

interface Props<DataType> {
  statuses: {
    isLoading?: boolean
    isDone?: boolean
    data?: DataType
    error?: string
  }
  isEmpty?: boolean
  renderError?: (error: string) => ReactElement
  renderLoading?: () => ReactElement
  renderPreview?: () => ReactElement | null
  renderEmpty?: () => ReactElement
  render: (data: this['renderEmpty'] extends undefined ? DataType | undefined : DataType) => ReactElement
}

function RendererStatusSplit<DataType = any>(props: Props<DataType>) {
  const { statuses, render, renderError, renderLoading, renderEmpty, renderPreview, isEmpty } = props
  const { isLoading, isDone, data, error } = statuses

  let isDataEmpty = !data
  if(props.hasOwnProperty('isEmpty')) {
    isDataEmpty = !!isEmpty
  }

  if(!isDataEmpty) { // @ts-ignore
    return render(data)
  }

  if (isLoading && renderLoading) {
    return renderLoading()
  }

  if (error && renderError) {
    return renderError(error)
  }

  if (!_.isUndefined(isDone) && !isDone && !_.isUndefined(renderPreview)) {
    if (_.isFunction(renderPreview)) return renderPreview()
    return null
  }



  if (isDataEmpty && renderEmpty) {
    return renderEmpty()
  }

  return render(data as DataType)
}

export default RendererStatusSplit
