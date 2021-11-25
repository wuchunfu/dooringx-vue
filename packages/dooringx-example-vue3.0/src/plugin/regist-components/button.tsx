/*
 * @Author: GeekQiaQia
 * @Date: 2021-11-17 13:38:18
 * @LastEditTime: 2021-11-25 21:42:05
 * @LastEditors: GeekQiaQia
 * @Description:
 * @FilePath: /dooringx-vue/packages/dooringx-example-vue3.0/src/plugin/regist-components/button.tsx
 */

import { Button } from 'vant'
import { ComponentItemFactory } from '@dooring/dooringx-vue-lib'

import { ComponentRenderConfigProps } from '@dooring/dooringx-vue-lib/src/core/components/componentItem'
import { createPannelOptions } from '@dooring/dooringx-vue-lib/src/core/components/formTypes'

import { FormMap } from '../form-types';

function ButtonTemp(pr: ComponentRenderConfigProps) {
  const props = pr.data.props
  return (
    <Button
      type={props.type}
      text={props.text}
      // plain
      // hairline
      size={props.size}
      color={props.color}
      // style={{
      //   width: props.width+'px',
      //   height: props.height+'px',
      //   borderRadius: props.borderRadius + 'px',
      //   border: `${props.borderData.borderWidth}px ${props.borderData.borderStyle} ${props.borderData.borderColor}`,
      //   backgroundColor: props.backgroundColor,
      //   color: props.fontData.color,
      //   fontSize: props.fontData.fontSize,
      //   fontWeight: props.fontData.fontWeight,
      //   fontStyle: props.fontData.fontStyle,
      //   textDecoration: props.fontData.textDecoration,
      //   lineHeight: props.lineHeight,
      //   boxShadow: `${props.boxShadowData.xOffset}px ${props.boxShadowData.yOffset}px ${props.boxShadowData.blurRadius}px ${props.boxShadowData.color}`,
      // }}
      onClick={() => {}}
    ></Button>
  )
}

const MButton = new ComponentItemFactory(
  'button',
  '按钮',
  {
    style: [
      createPannelOptions<FormMap, 'input'>('input', {
        receive: 'text', //用于发送回的props，必传 ,跨组件传递需要指定额外字段
        label: '文字'
      }),
      createPannelOptions<FormMap, 'color'>('color', {
        receive: 'backgroundColor',
        label: '背景颜色',
        value: 'rgba(255,255,255,1)'
      }),
      createPannelOptions<FormMap, 'font'>('font', {
        receive: 'fontData', //用于发送回的props，必传 ,跨组件传递需要指定额外字
        label: '字号',
        data: {
          fontSize: 14,
          fontStyle: '',
          textDecoration: '',
          color: '',
          fontWeight: ''
        }
      }),
      createPannelOptions<FormMap, 'inputNumber'>('inputNumber', {
        receive: 'lineHeight',
        label: '行高',
        value: 2
      }),
      createPannelOptions<FormMap, 'inputNumber'>('inputNumber', {
        receive: 'borderRadius',
        label: '边框圆角',
        value: 2
      }),
      createPannelOptions<FormMap, 'border'>('border', {
        receive: 'borderData',
        label: '边框',
        data: {
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,1)',
          borderRadius: 2,
          borderStyle: 'solid'
        },
        option: [
          {
            value: 'solid',
            text: '实线'
          },
          {
            value: 'dotted',
            text: '圆点'
          },
          {
            value: 'dashed',
            text: '虚线'
          }
        ]
      }),
      createPannelOptions<FormMap, 'boxShadow'>('boxShadow', {
        receive: 'boxShadowData',
        label: '阴影',
        data: {
          xOffset: 2,
          yOffset: 2,
          blurRadius: 4,
          color: 'rgba(82,113,237,1)'
        }
      })
    ]
  },
  {
    props: {
      text: '主要按钮',
      size: 'normal',
      type: 'primary',
      color: '#7232dd',

      sizeData: [100, 30],
      backgroundColor: 'rgba(0,132,255,1)',
      lineHeight: 1,
      borderRadius: 0,
      borderData: {
        borderWidth: 0,
        borderColor: 'rgba(0,0,0,1)',
        borderStyle: 'solid'
      },
      fontData: {
        fontSize: 14,
        textDecoration: 'none',
        fontStyle: 'normal',
        color: 'rgba(255,255,255,1)',
        fontWeight: 'normal'
      },
      boxShadowData: {
        xOffset: 0,
        yOffset: 0,
        blurRadius: 4,
        color: 'rgba(255,255,255,0)'
      }
    }
  },
  (data, context) => {
    return <ButtonTemp data={data} context={context}></ButtonTemp>
  },
  true
)

export default MButton