/**
 * diff 알고리즘
 * 노드1, 노드2 차이가 있는지 검사 (diff)
 * 1. 속성 수가 다른지 확인
 * 2. 하나 이상의 속성이 변경됐는지 확인
 * 3. 노드에 자식이 없으며, textContent 가 다른지 확인
 * ... 그 외 다른 조건들 넣으면 됨
 */
const isNodeChanged = (node1, node2) => {
  const node1Attributes = node1.attributes;
  const node2Attributes = node2.attributes;

  // 1. 속성 길이가 다르면 서로 다름
  if (node1Attributes.length !== node2Attributes.length) {
    return true;
  }

  // 2. 속성이 다르면 서로 다름
  const differentAttribute = Array.from(node1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });
  if (differentAttribute) {
    return true;
  }

  // 3. textContent 가 다르면 다름
  if (
    node1.children.length === 0 && //
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  // 그 외 다양한 조건들...

  return false;
};

/**
 * diff 알고리즘
 * 1. 새 노드가 정의되지 않은 경우 실제 노드 삭제
 * 2. 실제 노드가 정의되지 않았지만, 가상 노드가 존재하는 경우 부모 노드에 추가
 * 3. 두 노드가 정의된 경우 두 노드 간에 차이 확인 및 변경 적용
 * 4. 하위 노드도 똑같이 diff 알고리즘 적용
 */
const applyDiff = (parentNode, realNode, virtualNode) => {
  // 1. 새 노드가 정의되지 않은 경우 실제 노드 삭제
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // 2. 실제 노드가 정의되지 않았지만, 가상 노드가 존재하는 경우 부모 노드에 추가
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 3. 두 노드가 정의된 경우 두 노드 간에 차이 확인 후 실제 노드에 새로 생길(가상 노드) 대체
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  // 4. 하위 노드도 diff 알고리즘 적용
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);
  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    // applyDiff(parentNode, realNode, virtualNode);
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
