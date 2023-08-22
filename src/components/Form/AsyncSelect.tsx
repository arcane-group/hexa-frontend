import { Select, SelectProps, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useFormikContext, useField } from 'formik'

export function AsyncSelect<
  T1 extends string = 'value',
  T2 extends string = 'label',
  T3 extends string = 'options',
  T4 extends string = 'label',
  TValues = any
> ({
  valueStr,
  labelStr,
  defaultOptions = [],
  getOpFn,
  extensions, // 扩展字段
  relyValue, // 依赖其他属性, 最好是返回字符串
  name,
  optgroup,
  ...props
}: SelectProps & {
  valueStr?: T1
  labelStr?: T2
  defaultOptions?: Array<
    | {
        [key in T1 | T2]: any
      }
    | {
        [label in T3 | T4]:
          | {
              [key in T1 | T2]: any
            }[]
          | string
      }
  >
  getOpFn?: (values?: any) => Promise<
    Array<
      | {
          [key in T1 | T2]: any
        }
      | {
          [label in T3 | T4]:
            | {
                [key in T1 | T2]: any
              }[]
            | string
        }
    >
  >
  optgroup?: {
    labelStr: T4
    valueStr: T3
  }
  extensions?: string[]
  relyValue?: string | ((values: any) => any)
  name: string
}) {
  const [field] = useField(name)
  const { setFieldValue, values } = useFormikContext<TValues>()
  const [options, setOpts] = useState(defaultOptions)

  useEffect(() => {
    getOpFn?.()?.then(res => {
      if (Array.isArray(res)) {
        setOpts(res)
      }
    })
  }, [getOpFn])

  const newRelyValue =
    typeof relyValue === 'function'
      ? relyValue(values)
      : relyValue
      ? (values as any)?.[relyValue]
      : null

  useEffect(() => {
    if (newRelyValue) {
      getOpFn?.(newRelyValue)?.then(res => {
        if (Array.isArray(res)) {
          setOpts(res)
        }
      })
    }
  }, [newRelyValue, getOpFn, relyValue])

  const main = optgroup ? (
    <>
      {options.map((op: any) => {
        if (op?.[optgroup?.labelStr]) {
          return (
            <optgroup
              key={op?.[optgroup?.labelStr]}
              label={op?.[optgroup?.labelStr]}
              disabled={op?.disable}
            >
              <OPItems labelStr={labelStr} valueStr={valueStr} options={op?.[optgroup?.valueStr]} />
            </optgroup>
          )
        }
      })}
    </>
  ) : (
    <OPItems labelStr={labelStr} valueStr={valueStr} options={options} />
  )

  return (
    <>
      {extensions?.map(extension => {
        return <Input key={extension} disabled type='hidden' name={extension} />
      })}
      <Select
        size='md'
        height={'40px'}
        borderRadius={'0'}
        boxShadow='none !important'
        borderColor={'#155973 !important'}
        sx={{
          '::placeholder': {
            color: 'blackAlpha.500',
          },
        }}
        iconSize={'24px'}
        cursor={'pointer'}
        {...props}
        {...field}
        name={name}
        onChange={event => {
          props?.onChange?.(event)
          field?.onChange(event)

          try {
            const value = event.target.value
            if (typeof value !== 'undefined') {
              const curOp = event.target.querySelector(`option[value='${value}']`)
              const json = JSON.parse(curOp?.getAttribute('data-json') ?? '{}')
              if (Array.isArray(extensions)) {
                extensions.forEach(extension => {
                  setFieldValue(extension, json?.[extension], true)
                })
              }
            }
          } catch (e) {}
        }}
      >
        {main}
      </Select>
    </>
  )
}

const OPItems = ({
  options,
  valueStr,
  labelStr,
}: {
  options: any
  valueStr: any
  labelStr: any
}) => {
  return Array.isArray(options) ? (
    <>
      {options.map(op => {
        if (valueStr && typeof op?.[valueStr] !== 'undefined') {
          return (
            <option
              disabled={op?.disable}
              key={`${op?.[valueStr]}-${op?.[labelStr]}`}
              value={op?.[valueStr]}
              data-json={`${JSON.stringify(op)}`}
            >
              {labelStr ? op?.[labelStr] : '--'}
            </option>
          )
        }
      })}
    </>
  ) : null
}
